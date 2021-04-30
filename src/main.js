'use strict';
import express from "express";
import DataBase from "./database.js";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const filename = fileURLToPath (import.meta.url);
const __dirname = path.dirname (filename);

const app = express();

app.use (bodyParser.json({
    limit: "50mb", 
}) );

const DB = new DataBase ();

app.get("/",(req,res)=> {
    res.sendFile(__dirname + "/client/index.html");
});

app.get("/todo", async (req,res)=> {
    console.log("get");
    res.send(await DB.get () );
}); 

app.post("/todo", async (req,res)=> {
    console.log("post", req.body);
    const result = await  DB.create (req.body.title, req.body.body);  
    res.send (result);
});

app.delete("/todo/:id", async (req,res)=> {
    console.log("delete",req.params.id);
    await DB.delete (req.params.id);
    res.send("delete");
});

app.use('/js', express.static(path.join (__dirname, 'client/js')));
app.use('/css', express.static(path.join (__dirname, 'client/css')));

const server = app.listen(8000, ( ) => {
    console.log("я запустился");
});

process.on("SIGINT", () => {
    console.log("Stop");
    process.exit ();
});

