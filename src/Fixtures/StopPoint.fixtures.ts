import format from 'pg-format';
import dotenv from 'dotenv';
import _ from 'lodash';
import { getRandomIntInclusive, client, getLocalisationPointIds, getJourneyIds } from './utils';

dotenv.config();

var f = async function () {
  const numRecords =process.argv[2] === undefined ? 50 : Number(process.argv[2]);

  console.log("connexion à la base de donnée");
  await client.connect();

  console.log("création des fausses données");
  const journeyIds = await getJourneyIds()
  const localisationPointIds = await getLocalisationPointIds();

  let journey_ids: number[] = [];
  for (let i = 0; i < numRecords; i++) {
    journey_ids.push(getRandomIntInclusive(1, journeyIds.length))
  }

  const arr1 = _.range(numRecords)
                .map( i => {
                    return {
                        travel_step: 1,
                        journeyId: journey_ids[i],
                        localisationPointId: localisationPointIds[getRandomIntInclusive(1, localisationPointIds.length)]
                    };
                }).map((x) => [x.travel_step, x.journeyId, x.localisationPointId]);


  const arr2 = _.range(numRecords)
                .map( i => {
                    return {
                        travel_step: 2,
                        journeyId: journey_ids[i],
                        localisationPointId: localisationPointIds[getRandomIntInclusive(1, localisationPointIds.length)]
                    };
                }).map((x) => [x.travel_step, x.journeyId, x.localisationPointId]);

  // perform insert 1
  console.log("insertion 1");
  const insertSql1 = format('insert into "public"."stop_points" ("travel_step", "journeyId", "localisationPointId") values %L returning id', arr1);
  const res1 = await client.query(insertSql1);
  console.log("nombre de lignes inserées: ", res1.rowCount);

  // perform insert 2
  console.log("insertion 2");
  const insertSql2 = format('insert into "public"."stop_points" ("travel_step", "journeyId", "localisationPointId") values %L returning id', arr2);
  const res2 = await client.query(insertSql2);
  console.log("nombre de lignes inserées: ", res2.rowCount);
};

f()
  .then(() => {
    console.log("insertion réussie !");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
  });
