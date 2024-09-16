import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import UserController from "../controller/User.controller";
import { User, CreateUserInput, LoginInput } from "../entity/User.entity";
import { MyContext } from "../types/MyContext";


@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async findUser( @Ctx() ctx: MyContext): Promise<Partial<User> | null> {
    if(ctx.user.id) {
      return await new UserController().findUser(ctx.user.id)
    } else {
      return null;
    }
  }

  @Mutation(() => String)
  async login(
    @Arg("loginInput") loginInput : LoginInput
  ): Promise<any> {
    return await new UserController().login(loginInput);
  }

  @Mutation(() => User)
  async createUser(
    @Arg("createUserInput") createUserInput: CreateUserInput
  ): Promise<User> {
    let user = await new UserController().createUser(createUserInput);
    return user;
  }

}