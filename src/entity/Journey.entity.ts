import { Max } from "class-validator";
import { Field, Float, ID, InputType, Int, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CreateStopPointInput, StopPoint } from './StopPoint.entity';
import { Booking, CreateBookingInput } from "./Booking.entity";
import { Car } from "./Car.entity";
import { GraphQLDate, GraphQLTime } from "graphql-scalars";

@ObjectType()
@Entity("journeys")
export class Journey {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Float)
  @Column({ type: "float" })
  cost: number;

  @Field(() => GraphQLDate)
  @Column({nullable: true})
  start_date: string;

  @Field(() => GraphQLTime)
  @Column({nullable: true})
  start_time: string;

  @Field(() => GraphQLTime)
  @Column({nullable: true})
  duration: string;

  @Field()
  @Column()
  is_instant_bookable: boolean;

  @Field(() => Int)
  @Max(9)
  @Column()
  seats_available: number;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  comment?: string;

  @Field(() => [Booking])
  @OneToMany(() => Booking, (booking) => booking.journey, {cascade: true})
  bookings: Booking[];

  @Field(() => Car)
  @ManyToOne(() => Car, (car) => car.journeys)
  car: Car;
  
  @Field(() => [StopPoint])
  @OneToMany(() => StopPoint, (stop_point) => stop_point.journey, {eager: true})
  stop_points: StopPoint[];
}

@InputType({ description: "create a Journey" })
export class CreateJourneyInput implements Partial<Journey>{
  @Field(() => Float)
  cost: number;

  @Field(() => GraphQLDate)
  start_date: string;

  @Field(() => GraphQLTime)
  start_time: string;

  @Field(() => GraphQLTime)
  duration: string;

  @Field()
  is_instant_bookable: boolean;

  @Field(() => Int)
  @Max(9) 
  seats_available: number;

  @Field({ nullable: true })
  comment?: string;

  @Field(() => Int)
  carId: number;

  @Field(() => CreateStopPointInput)
  startPoint: CreateStopPointInput;

  @Field(() => CreateStopPointInput)
  endPoint: CreateStopPointInput;

  @Field(() => CreateBookingInput)
  booking: CreateBookingInput;
}