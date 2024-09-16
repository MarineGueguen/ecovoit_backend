import { Repository } from "typeorm";
import { User, CreateUserInput, LoginInput } from "../entity/User.entity";
import dataSource from "../lib/dataSource";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController
{
    db: Repository<User>;

    constructor(){
        this.db = dataSource.getRepository('User');
    }

    async createUser({
        first_name,
        last_name,
        password,
        email,
        phone_number,
        date_of_birth
    } :CreateUserInput) {

        let hash = await bcrypt.hash(password,10);
        let user = this.db.create({
            first_name,
            last_name,
            email,
            password: hash,
            date_of_birth,
            phone_number,
        });
        return await this.db.save(user);
    }


    async login( { email,password }: LoginInput ){
        let user = await this.db.findOne({where: {email}})
        if(user) {
            let result = await bcrypt.compare(password, user.password)
           if(result){
               return jwt.sign({
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    is_admin: user.is_admin
               },
               'aslkdfjoiq12312',{
               expiresIn: '30d'
               })
           }
        }
        return "User not found";
    }

    async findUser(id: number) {
        return await this.db.findOne({where: {id}})
    }
}

export default UserController;