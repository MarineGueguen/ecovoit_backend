import format from 'pg-format';
import { faker } from '@faker-js/faker/locale/fr'
import dotenv from 'dotenv';
import _ from 'lodash';
import { getRandomIntInclusive, client, getUserIds, getJourneyIds } from './utils';

dotenv.config()

var f = async function () {
    const numRecords = process.argv[2] === undefined ? 50 : Number(process.argv[2])

    console.log('connexion à la base de donnée')
    await client.connect()

    console.log('création des fausses données');
    const userIds = await getUserIds();
    const journeyIds = await getJourneyIds();
    const arr = _.range(numRecords).map( () => {

        return {
            comment: faker.lorem.paragraph(),
            booking_status: getRandomIntInclusive(0,2),
            is_car_owner: getRandomIntInclusive(0,1),
            userId: userIds[getRandomIntInclusive(0, userIds.length)],
            journeyId: journeyIds[getRandomIntInclusive(0, journeyIds.length)],
        }
    }).map(x => [ x.comment, x.booking_status, x.is_car_owner, x.userId, x.journeyId]);

    // perform insert
    console.log('insertion')
    const insertSql = format('insert into "public"."bookings" ("comment", "booking_status", "is_car_owner", "userId", "journeyId") values %L returning id', arr)
    const res = await client.query(insertSql)
    console.log('nombre de lignes inserées: ', res.rowCount)
}

f().then(() => {
    console.log('insertion réussie !')
    process.exit(0)
}).catch(error => {
    console.error(error)
})