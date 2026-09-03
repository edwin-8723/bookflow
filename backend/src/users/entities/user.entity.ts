import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';
import { Business } from '../../businesses/entities/business.entity.js';

export enum UserRole {
  OWNER = 'owner',
  STAFF = 'staff',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.OWNER })
  role: UserRole;

  @Column()
  businessId: string;

  @ManyToOne(() => Business, (business) => business.users)
  business: Relation<Business>;

  @CreateDateColumn()
  createdAt: Date;
}