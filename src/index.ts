import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import dataSource from './lib/dataSource';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolver/User.resolver';
import jwt from "jsonwebtoken";
import { JourneyResolver } from "./resolver/Journey.resolver"


const APP_SECRET = 'aslkdfjoiq12312';

const getUser = (token: string) => {
  return new Promise((resolve) => {
    try {
      if (token) {
        jwt.verify(token, APP_SECRET, (err: jwt.VerifyErrors | null, payload: string | jwt.JwtPayload | undefined) => {
          console.log(err);
          resolve(payload);
        })
      } else {
        resolve(null);
      }

    } catch (err) {
      resolve(null);
    }
  })
}

async function startApolloServer() {
  const app = express();
  const schema = await buildSchema({ resolvers: [UserResolver, JourneyResolver], validate: false });

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const token = req.get('Authorization') || ''
      const user = await getUser(token.replace('Bearer ', ''));
      return { user }
    },
    csrfPrevention: true,
    introspection: process.env.NODE_ENV === "production" ? false : true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: '/',
  });
  await dataSource.initialize();
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();