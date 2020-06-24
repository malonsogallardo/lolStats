
require("dotenv").config();

const { MongoError } = require("mongodb");
const mongoose = require("mongoose");
const axios = require("axios");
const DBURL = process.env.DBURL;

const getData = async() => {
    console.log("funcion llamada api")
    const response = await axios({
        method: "get", 
        url: "http://ddragon.leagueoflegends.com/cdn/10.12.1/data/en_US/champion.json", 
        responseType: "json"
    })
    console.log(Object.entries(response.data.data).map(e => e.map(i => i.name).pop()))
}

// -------------------------
// Drop collection if already exists
// -------------------------
const dropIfExists = async Model => {
    try {
        await Model.collection.drop();
    } catch (e) {
        if (e instanceof MongoError) {
            console.log(
                `Cannot drop collection ${Model.collection.name}, because does not exist in DB`
            );
            return;
        }
    }
};

// -------------------------
// Woking with DB connection
// -------------------------
const withDbConnection = async (fn, disconnectEnd = true) => {
    try {
        await mongoose.connect(DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Connection Ready on ${DBURL}`);
        await fn();
    } catch (error) {
        console.log("ERROR");
        console.log(error);
    } finally {
        // Disconnect from database
        if (disconnectEnd) {
            await mongoose.disconnect();
            console.log("disconnected");
        }
    }
};

module.exports={
    withDbConnection,
    dropIfExists,
    getData
}

