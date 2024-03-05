
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Users } from './Users.entity';
import { Listing } from './Listing.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @Column({ nullable: true })
  response: string;

  @Column()
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users, user => user.reviews)
  user: Users;

  @ManyToOne(() => Listing, listing => listing.reviews)
  listing: Listing;

}