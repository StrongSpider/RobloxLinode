const axios = require('axios').default
const fs = require('node:fs')
const path = require("path");

const express = require("express");
const cors = require("cors");

const config = require("./config.json")

const app = express();
app.use(cors());

app.get("/getregion", async function (req, res) {
    try {
        const data = await axios.get(`http://ip-api.com/json/${req.ip}?fields=status,countryCode,regionName,city`).data
        res.send(data)
    } catch (e) {
        res.send({
            "status": "fail"
        })
    }
})

app.listen(5021, config.host, async function () {
    console.log(`App listening: http://${config.host}:5021`);
});
