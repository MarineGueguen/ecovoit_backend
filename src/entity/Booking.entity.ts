import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReservationStatus } from "../enums/passenger.enums";
import { Journey } from "./Journey.entity";
import { User } from "./User.entity";

@ObjectType()
@Entity("bookings")
export class Booking {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment?: string;

  @Field(() => ReservationStatus)
  @Column({
    type: "enum",
    enum: ReservationStatus,
  })
  booking_status: ReservationStatus;

  @Field()
  @Column()
  is_car_owner: boolean;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @Field(() => Journey)
  @ManyToOne(() => Journey, (journey) => journey.bookings)
  journey: Journey;
}

@InputType({ description: "create a Booking" })
export class CreateBookingInput implements Partial<Booking>{
  @Field({ nullable: true })
  comment?: string;

  @Field(() => ReservationStatus)
  booking_status: ReservationStatus;

  @Field()
  is_car_owner: boolean;
}
