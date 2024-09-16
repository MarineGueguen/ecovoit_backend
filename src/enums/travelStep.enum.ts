import { registerEnumType } from "type-graphql";

export enum TravelStep {
  "start",
  "end"
}

registerEnumType(TravelStep, {
  name: "TravelStep"
});