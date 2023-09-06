
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const  db = await sqlite.open({
    filename:  './data_plan.db',
    driver:  sqlite3.Database
});

//console.log('db initialized')

await db.migrate();

export async function getPlans () {
    return db.all('select * from price_plan');

}

export async function addPriceplan(plan_name, sms_price, call_price) {
    const sql=`insert into price_plan (plan_name, sms_price, call_price) values(?,?,?);`
    await db.run(sql, [plan_name,sms_price, call_price])
}

export async function getSpecificPlan (plan_name){
    const sql= `select * from price_plan where plan_name= ?`
    return db.get(sql, plan_name)
}

export async function updatePlan (plan_name, sms_price, call_price){
    const sql= `update price_plan set call_price = ?, sms_price = ? where plan_name = ?`
    await db.run(sql, [plan_name, sms_price, call_price])
}

export async function deletePlan (plan_name) {
    const sql = `delete from price_plan where plan_name = ?`
    await db.run(sql, plan_name)
}