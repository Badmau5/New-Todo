import Knex from "knex";

export default class  DataBase {
    connection;
    constructor (){
        const config = {
            client:"postgresql",
            connection: {
                host:"127.0.0.1",
                database:"project1",
                user:"slepchenko",
                password:"slepchenko",
            },
        };  
        this.connection = Knex (config);
    }

    async get() {
        const result = await this.connection.raw(`
            select * from test;
        `);
        return result.rows;
    };
    async create(title, body) {
        const result = await this.connection.raw(`
            insert into test (title, body)
            values (?,?)
            returning id
        `,[title, body]);
        console.log(result);
        return result.rows[0];
    };
    async delete(id) {
        const result = await this.connection.raw(`
            delete from test where id = ?;
        `,id);
        return ;
    };
};