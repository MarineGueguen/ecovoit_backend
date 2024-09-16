import { CarBrand, CarColor, Fuel } from "../enums/car.enums";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Journey } from "./Journey.entity";
import { Max } from "class-validator";

@ObjectType()
@Entity("cars")
export class Car {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  model: string;

  @Field(() => CarBrand)
  @Column({
    type: "enum",
    enum: CarBrand,
  })
  brand: CarBrand;

  @Field(() => Fuel)
  @Column({
    type: "enum",
    enum: Fuel,
  })
  energy: Fuel;

  @Field(() => Int)
  @Column()
  @Max(9)
  seats_number: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sticker?: number;

  @Field()
  @Column({ unique: true })
  registration_number: string;

  @Field()
  @Column()
  registration_year: Date;

  @Field(() => CarColor, { nullable: true })
  @Column({
    type: "enum",
    enum: CarColor,
    nullable: true
  })
  color?: CarColor;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.vehicules)
  owner: User;

  @Field(() => Journey)
  @OneToMany(() => Journey, (journey) => journey.car, {cascade: true})
  journeys: Journey[]
}
