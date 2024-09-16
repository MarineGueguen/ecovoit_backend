import { TravelStep } from "../enums/travelStep.enum"

export type ISearchJourneys = {
    start_date: string
    start_time: string
    nbPassengers: number
    startCity: string
    endCity: string
    startStep: TravelStep
    endStep: TravelStep
}