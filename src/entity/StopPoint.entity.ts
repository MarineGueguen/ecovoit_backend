import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, InputType, Float } from "type-graphql";
import { ID } from "type-graphql";
import { Journey } from './Journey.entity';
import { TravelStep } from '../enums/travelStep.enum';

@ObjectType()
@Entity("stop_points")
export class StopPoint {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Float)
    @Column({nullable: true})
    latitude: number;

    @Field(() => Float)
    @Column({nullable: true})
    longitude: number;

    @Field()
    @Column({nullable: true})
    city: string;

    @Field(() => TravelStep)
    @Column({
      type: "enum",
      enum: TravelStep,
      nullable: true
    })
    travel_step: TravelStep;

    @Field(() => Journey)
    @ManyToOne(() => Journey, (journey) => journey.stop_points)
    journey: Journey;
}

@InputType({ description: "Créer un point d'arrêt" })
export class CreateStopPointInput implements Partial<StopPoint>{
    @Field(() => Float)
    latitude: number;

    @Field(() => Float)
    longitude: number;

    @Field()
    city: string;

    @Field(() => TravelStep)
    travel_step: TravelStep;
}