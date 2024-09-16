import { ISearchJourneys } from "src/types/ISearchJourneys";
import { Repository } from "typeorm";
import { CreateJourneyInput, Journey } from "../entity/Journey.entity";
import dataSource from "../lib/dataSource";

class JourneyController {
  db: Repository<Journey>;

  constructor() {
    this.db = dataSource.getRepository("Journey");
  }

  async createJourney(
    newJourney: CreateJourneyInput,
    contextUserId: number | undefined
  ) {
    if (contextUserId) {
      return await this.db.save({
        ...newJourney,
        car: { id: newJourney.carId },
        bookings: [
          {
            ...newJourney.booking,
            booking_status: 1,
            is_car_owner: true,
            user: { id: contextUserId },
          },
        ],
        stop_points: [
          {
            ...newJourney.startPoint,
            travel_step: 0,
          },
          {
            ...newJourney.endPoint,
            travel_step: 1,
          }
        ],
      });
    }
    return null;
  }

  async searchJourneys({ start_date, start_time, nbPassengers, startCity, startStep, endCity, endStep }: ISearchJourneys) {
    const journeys = await this.db
      .createQueryBuilder("journey")
      .leftJoinAndSelect("journey.stop_points", "start_point")
      .leftJoinAndSelect("journey.stop_points", "end_point")
      .where("journey.start_date = :start_date AND journey.start_time >= :start_time AND journey.seats_available >= :nbPassengers", { start_date, start_time, nbPassengers })
      .andWhere("start_point.city = :startCity AND start_point.travel_step = :startStep", { startCity, startStep })
      .andWhere("end_point.city = :endCity AND end_point.travel_step = :endStep", { endCity, endStep })
      .getRawMany()

    return journeys.map(({
      journey_id: id,
      journey_created_at: created_at,
      journey_cost: cost,
      journey_start_date: start_date,
      journey_start_time: start_time,
      journey_is_instant_bookable: is_instant_bookable,
      journey_comment: comment,
      journey_carId: carId,
      start_point_id,
      start_point_city,
      start_point_travel_step,
      end_point_id,
      end_point_city,
      end_point_travel_step,
      ...journey
    }) => {
      return {
        id,
        created_at,
        cost,
        start_date,
        start_time,
        is_instant_bookable,
        comment,
        carId,
        stop_points: [
          {
            id: start_point_id,
            city: start_point_city,
            travel_step: start_point_travel_step
          },
          {
            id: end_point_id,
            city: end_point_city,
            travel_step: end_point_travel_step
          },
        ],
        ...journey
      }
    })
  }
}

export default JourneyController;
