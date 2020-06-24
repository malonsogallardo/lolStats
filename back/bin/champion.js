require("dotenv").config();
const axios = require("axios");

const { withDbConnection } = require("../lib");
const Champion = require("../models/champion")

    withDbConnection(async () => {
        const url = "../public/images/tiles"
        const extension = "_0.jpg"
        const response = await axios.get("http://ddragon.leagueoflegends.com/cdn/10.12.1/data/en_US/champion.json")
        const responseParser = await Object.values(response.data.data)
        await Champion.create(responseParser.map(champion => {
            return {
                name:champion.name,
                tags:champion.tags,
                description: champion.blurb,
                title: champion.title,
                stats: champion.info,
                image: `${url}/` + champion.id + extension
            }
        }))
    })
