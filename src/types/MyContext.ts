import { User } from "src/entity/User.entity";

export interface MyContext {
    user: Partial<User>
}