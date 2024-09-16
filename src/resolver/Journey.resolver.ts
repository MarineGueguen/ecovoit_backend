import JourneyController from "../controller/Journey.controller";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateJourneyInput, Journey } from "../entity/Journey.entity";
import { MyContext } from "../types/MyContext";

@Resolver(Journey)
export class JourneyResolver {
  @Mutation(() => Journey, { nullable: true })
  async createJourney(
    @Ctx() ctx: MyContext,
    @Arg("createJourneyInput") createJourneyInput: CreateJourneyInput
  ): Promise<Journey | null> {
    if (ctx.user.id !== null) {
      return await new JourneyController().createJourney(
        createJourneyInput,
        ctx.user.id
      );
    } else {
      // throw new UnauthorizedException(); // 401 // 403
      return null;
    }
  }


  @Query(() => [Journey])
  async searchJourneys(
    @Arg("startCity") startCity: string,
    @Arg("startStep") startStep: number,
    @Arg("endCity") endCity: string,
    @Arg("endStep") endStep: number,
    @Arg("start_date") start_date: string,
    @Arg("start_time") start_time: string,
    @Arg("nbPassengers") nbPassengers: number,
  ): Promise<Journey[] | null | void> {
    return await new JourneyController().searchJourneys({start_date, start_time, nbPassengers, startCity, startStep, endCity, endStep});
  }
}
