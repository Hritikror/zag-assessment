import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Users } from './Users.entity';
import { Review } from './Review.entity';

@Entity()
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  businessName: string;

  @Column()
  businessPhone: string;

  @Column()
  address: string;

//   @Column('simple-array', { nullable: true })
//   images: string[];

  @Column()
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;  

  @ManyToOne(() => Users, user => user.listings, { eager: true })
  owner: Users;

  @OneToMany(() => Review, review => review.listing)
  reviews: Review[];

  // ... other listing-related fields
}