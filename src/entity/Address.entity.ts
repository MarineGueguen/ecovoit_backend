import { Country } from "../enums/country.enums";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@ObjectType()
@Entity("addresses")
export class Address {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  street_line_1: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  street_line_2?: string;

  @Field()
  @Column()
  zip_code: string;

  @Field()
  @Column()
  city: string;

  @Field(() => Country)
  @Column({
    type: "enum",
    enum: Country,
  })
  country: Country;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}
