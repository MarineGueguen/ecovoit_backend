import { registerEnumType } from "type-graphql";

export enum Fuel {
  "diesel",
  "sp95",
  "sp98",
  "e85",
  "hybrid",
  "electric",
}
registerEnumType(Fuel, {
  name: "Fuel"
});

export enum CarColor {
  white = "blanc",
  black = "noir",
  green = "vert",
  blue = "bleu",
  yellow = "jaune",
  pink = "rose",
  red = "rouge",
  grey = "gris",
  beige = "beige",
}
registerEnumType(CarColor, {
  name: "CarColor"
});

export enum CarBrand {
  "renault",
  "opel",
  "fiat",
  "porshe",
  "mercedes",
  "audi",
  "volkswagen",
  "peugeot",
  "kia",
  "citroen",
  "toyota",
  "ford",
  "bmw",
}
registerEnumType(CarBrand, {
  name: "CarBrand"
});