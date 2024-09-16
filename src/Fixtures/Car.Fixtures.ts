import format from 'pg-format';
import { faker } from '@faker-js/faker/locale/fr';
import dotenv from 'dotenv';
import _ from 'lodash';
import { getRandomIntInclusive, client, getUserIds } from './utils';

dotenv.config()

var f = async function () {
    const numRecords = process.argv[2] === undefined ? 30 : Number(process.argv[2])

    console.log('connexion à la base de donnée')
    await client.connect()

    console.log('création des fausses données');
    const color = ["blanc","noir","vert","bleu","jaune","rose","rouge","gris","beige"];
    const userIds = await getUserIds();
    const arr = _.range(numRecords).map( () => {

        return {
            model: faker.vehicle.model(),
            brand: getRandomIntInclusive(0, 12),
            energy: getRandomIntInclusive(0, 5),
            seats_number: getRandomIntInclusive(0,6),
            registration_number: faker.vehicle.vrm(),
            registration_year: faker.date.birthdate({ min: 1920, max: 2022, mode: 'year' }),
            color: color[getRandomIntInclusive(0,8)],
            ownerId: userIds[getRandomIntInclusive(0, userIds.length)]
        }
    }).map(x => [ x.model, x.brand, x.energy, x.seats_number, x.registration_number, x.registration_year, x.color, x.ownerId])

    // perform insert
    console.log('insertion')
    const insertSql = format('insert into "public"."cars" ("model", "brand", "energy", "seats_number", "registration_number", "registration_year" , "color", "ownerId") values %L returning id', arr)
    const res = await client.query(insertSql)
    console.log('nombre de lignes inserées: ', res.rowCount)
}

f().then(() => {
    console.log('insertion réussie !')
    process.exit(0)
}).catch(error => {
    console.error(error)
})