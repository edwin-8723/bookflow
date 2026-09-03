import { ConflictException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Business } from '../businesses/entities/business.entity.js';
import { User, UserRole } from '../users/entities/user.entity.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersRepository.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('El email ya está registrado');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    return this.dataSource.transaction(async (manager) => {
      const business = await manager.save(Business, { name: dto.businessName });
      const user = await manager.save(User, {
        email: dto.email,
        passwordHash,
        role: UserRole.OWNER,
        businessId: business.id,
      });

      return {
        businessId: business.id,
        userId: user.id,
        email: user.email,
        role: user.role,
      };
    });
  }
}