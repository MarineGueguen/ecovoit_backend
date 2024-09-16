import { registerEnumType } from "type-graphql";

export enum ReservationStatus {
  "pending",
  "validated",
  "refused",
}

registerEnumType(ReservationStatus, {
  name: "ReservationStatus"
});