import { Car } from '../entity/Car.entity';
import { DataSource } from 'typeorm';
import { User } from '../entity/User.entity';
import { Journey } from '../entity/Journey.entity';
import { Booking } from '../entity/Booking.entity';
import { Address } from '../entity/Address.entity';
import { StopPoint } from '../entity/StopPoint.entity';

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "db",
  username: "postgres",
  password: "postgres",
  database: "ecovoit",
  synchronize: true,
  entities: [User, Car, Journey, Booking, Address, StopPoint],
  logging: ["query", "error"],
})

export default dataSource;
