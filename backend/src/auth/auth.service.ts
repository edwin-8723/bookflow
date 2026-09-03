import { ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Business } from '../businesses/entities/business.entity.js';
import { User, UserRole } from '../users/entities/user.entity.js';
import { RegisterDto } from './dto/register.dto.js';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
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
  async login(dto: LoginDto) {
  const user = await this.usersRepository.findOne({ where: { email: dto.email } });
  if (!user) {
    throw new UnauthorizedException('Credenciales inválidas');
  }
  const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
  if (!passwordMatches) {
    throw new UnauthorizedException('Credenciales inválidas');
  }
  const payload = { sub: user.id, businessId: user.businessId, role: user.role };
  const accessToken = await this.jwtService.signAsync(payload);
  return { accessToken };
  }
}