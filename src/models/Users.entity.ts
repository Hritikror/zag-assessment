import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { UserRole } from './enums/roles.enum';
import * as bcrypt from 'bcryptjs';
import { Listing } from './Listing.entity';
import { Review } from './Review.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @BeforeInsert()
  async hashPassword() {
      this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
  }

  @OneToMany(() => Listing, listing => listing.owner)
  listings: Listing[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

}