import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "../resolver/User.resolver";
import { buildSchema } from "type-graphql";

describe("User controller functionnalities", () => {
    const email = `test${new Date().getTime()}@gmail.com`;
    const password = `test`;

    it('create new user', async () => {
        const schema = await buildSchema({ resolvers: [UserResolver], validate: false });
        const testServer = new ApolloServer({
            schema,
            mocks: true,
        });

        const result = await testServer.executeOperation({
            query: `mutation CreateUser($createUserInput: CreateUserInput!) { createUser(createUserInput: $createUserInput) {
                email
                first_name
                last_name
              }
            }`,
            variables: {
                "createUserInput": {
                    "date_of_birth": "2022-11-15T09:34:05+00:00",
                    "email": email,
                    "first_name": "Josée",
                    "last_name": "Durant",
                    "password": password,
                    "phone_number": "0000000000",
                }
            },
        });
        
        expect(result.errors).toBeUndefined();
        expect(result.data?.createUser).toMatchObject({first_name: "Hello World"});
    });

    it('get a token if user is logued', async () => {
        const schema = await buildSchema({ resolvers: [UserResolver], validate: false });
        const testServer = new ApolloServer({
            schema,
            mocks: true,
        });

        const result = await testServer.executeOperation({
            query: `mutation Login($loginInput: LoginInput!) {
                login(loginInput: $loginInput)
            }`,
            variables: {
                "loginInput": {
                    "email": email,
                    "password": password
                }
            },
        });
        
        expect(result.errors).toBeUndefined();
        expect(result.data?.login).toMatch("Hello World");
    });

    it('get user informations', async () => {
        const schema = await buildSchema({ resolvers: [UserResolver], validate: false });
        const testServer = new ApolloServer({
            schema,
            mocks: true,
        });

        const result = await testServer.executeOperation({
            query: `query Query {
                findUser {
                    email
                    first_name
                    last_name
                }
            }`,
        }); 
        
        expect(result.errors).toBeUndefined();
        expect(result.data?.findUser).toMatchObject({first_name: "Hello World", last_name: "Hello World"});
    });
})