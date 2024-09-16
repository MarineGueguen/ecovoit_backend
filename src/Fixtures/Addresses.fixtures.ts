import format from 'pg-format';
import { faker } from '@faker-js/faker/locale/fr';
import dotenv from 'dotenv';
import _ from 'lodash';
import  { getRandomIntInclusive, client, getUserIds } from './utils';

dotenv.config()

var f = async function () {
    const numRecords = process.argv[2] === undefined ? 50 : Number(process.argv[2]);

    console.log('connexion à la base de donnée')
    await client.connect()

    console.log('création des fausses données');
    const userIds = await getUserIds();
    const arr = _.range(numRecords).map( () => {

        return {
            street_line_1: faker.address.streetAddress(),
            street_line_2: getRandomIntInclusive(0, 2) === 0 ? faker.address.secondaryAddress() : null,
            zip_code: faker.address.zipCode('#####'),
            city: faker.address.cityName(),
            country: 'FR',
            userId: userIds[getRandomIntInclusive(0, userIds.length)]
        }
    }).map((x: { street_line_1: string; street_line_2: string|null; zip_code: string; city: string; country: string; userId: number; }) => [ x.street_line_1, x.street_line_2, x.zip_code, x.city, x.country, x.userId]);

    // perform insert
    console.log('insertion')
    const insertSql = format('insert into "public"."addresses" ("street_line_1", "street_line_2", "zip_code", "city", "country","userId") values %L returning id', arr)
    const res = await client.query(insertSql)
    console.log('nombre de lignes inserées: ', res.rowCount)
}

f().then(() => {
    console.log('insertion réussie !')
    process.exit(0)
}).catch(error => {
    console.error(error)
})