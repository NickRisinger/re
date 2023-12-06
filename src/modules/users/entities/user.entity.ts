import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  secondName: string;

  @Column({ nullable: true })
  advertFio: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  dopPhone: string;

  @Column({ nullable: true })
  advertPhone: string;

  @Column()
  city: string;

  // relations columns

  // bolean columns
  @Column({ nullable: true })
  isOnline: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  // time columns
  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  trainingAt: Date;

  @Column({ nullable: true })
  startWorkAt: Date;

  @Column({ nullable: true })
  dismissalAt: Date;

  @Column({ nullable: true })
  archivedAt: Date;
}
