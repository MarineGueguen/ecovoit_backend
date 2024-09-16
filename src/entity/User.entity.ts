import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
import { ID } from "type-graphql";
import { Car } from "./Car.entity";
import { Booking } from "./Booking.entity";
import { Address } from "./Address.entity";

@ObjectType()
@Entity("users")
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @Field()
    @Column()
    first_name: string;

    @Field()
    @Column()
    last_name: string;

    @Field()
    @Column({ unique: true})
    email: string;

    @Field()
    @Column()
    password: string;

    @Field()
    @Column()
    date_of_birth: Date;

    @Field()
    @Column({nullable: true})
    phone_number: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    biography?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    photo?: string;

    @Field()
    @Column({ default: false })
    is_admin: boolean;

    @Field(() => [Car])
    @OneToMany(() => Car, (car) => car.owner)
    vehicules: Car[];

    @Field(() => [Booking])
    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[];

    @Field(() => [Address])
    @OneToMany(() => Address, (address) => address.user, { cascade: true, eager: true })
    addresses: Address[];
}

@InputType({ description: "creer un User" })
export class CreateUserInput implements Partial<User>{
    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    date_of_birth: Date;

    @Field()
    phone_number: string;

}

@InputType({ description: "login"})
export class LoginInput implements Partial<User>{
    @Field()
    email: string;

    @Field()
    password: string;
}
