import format from 'pg-format';
import { faker } from '@faker-js/faker/locale/fr';
import dotenv from 'dotenv';
import _ from 'lodash';
import {getRandomIntInclusive, client, getCarIds, } from './utils';

dotenv.config()

var f = async function () {
    const numRecords = process.argv[2] === undefined ? 25 : Number(process.argv[2])

    console.log('connexion à la base de donnée')
    await client.connect()

    console.log('création des fausses données');
    const carIds = await getCarIds();
    const arr = _.range(numRecords).map( () => {

        return {
            cost: getRandomIntInclusive(6,50),
            start_date_time: faker.date.future(),
            is_instant_bookable: getRandomIntInclusive(0,1),
            seats_available: getRandomIntInclusive(1,9),
            comment: faker.lorem.paragraph(),
            carId: carIds[getRandomIntInclusive(0, carIds.length)],
        }
    }).map(x => [ x.cost, x.start_date_time, x.is_instant_bookable, x.seats_available, x.comment, x.carId]);

    // perform insert
    console.log('insertion')
    const insertSql = format('insert into "public"."journeys" ("cost", "start_date_time", "is_instant_bookable", "seats_available", "comment","carId") values %L returning id', arr)
    const res = await client.query(insertSql)
    console.log('nombre de lignes inserées: ', res.rowCount)
}

f().then(() => {
    console.log('insertion réussie !')
    process.exit(0)
}).catch(error => {
    console.error(error)
})