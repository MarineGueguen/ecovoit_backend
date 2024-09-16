import PG from 'pg';
import dotenv from 'dotenv';

export function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

dotenv.config();
export const client = new PG.Client({
    connectionString: process.env.DB_CONNEXION
})

export async function  getUserIds() {
    let userIdsresult = await client.query('select id from "public"."users"');
    let userIds: number[]= [];
    userIdsresult.rows.map( (row: { id: number; }) => {
        userIds.push(row.id)
    });
    return userIds;
}

export async function getJourneyIds() {
    let journeyIdResult = await client.query('select id from "public"."journeys"');
    let journeyIds: number[] = [];
    journeyIdResult.rows.map( row => {
        journeyIds.push(row.id)
    });
    return journeyIds;
}

export async function getCarIds() {
    let carIdsresult = await client.query('select id from "public"."cars"');
    let carIds: number[] = [];
    carIdsresult.rows.map( row => {
        carIds.push(row.id)
    });
    return carIds;
}

export async function getLocalisationPointIds() {
    let localisationPointIdsResult = await client.query('select id from "public"."localisation_points"');
    let localisationPointIds: number[] = [];
    localisationPointIdsResult.rows.map((row) => {
        localisationPointIds.push(row.id);
    });
    return localisationPointIds;
}