import format from 'pg-format';
import { faker } from '@faker-js/faker/locale/fr';
import dotenv from 'dotenv';
import _ from 'lodash';
import { client } from './utils';

dotenv.config()

var f = async function () {
    const numRecords = process.argv[2] === undefined ? 100 : Number(process.argv[2])

    console.log('connexion à la base de donnée')
    await client.connect()

    console.log('création des fausses données');
    const arr = _.range(numRecords).map( i => {

        return {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: i === 1 ? 'example@email.com' : faker.internet.email(),
            password: i === 1 ? "$2y$10$IBeUOgopND2DWxZRxBF.VOE5cFAyx8yBgBQy2EvYasEtwfi7JIwSS" : "$2b$10$MPH9p7fz3H9l2x0FcZ2veeVaUVIck5BmbqrfdAYArlMS4Hbj9cmay", // Azerty123@ pour chaque user
            date_of_birth: faker.date.birthdate({ min: 1920, max: 2004, mode: 'year' }),
            biography: faker.lorem.paragraph(),
            isAdmin: false,
            phone_number: faker.phone.number('06########')
        }
    }).map(x => [ x.first_name, x.last_name, x.email, x.password, x.date_of_birth, x.biography, x.isAdmin, x.phone_number])

    // perform insert
    console.log('insertion')
    const insertSql = format('insert into "public"."users" ("first_name", "last_name", "email", "password", "date_of_birth","biography" , "is_admin", "phone_number")values %L returning id', arr)
    const res = await client.query(insertSql)
    console.log('nombre de lignes inserées: ', res.rowCount, '(user test compris)')
}

f().then(() => {
    console.log('insertion réussie !')
    process.exit(0)
}).catch(error => {
    console.error(error)
})