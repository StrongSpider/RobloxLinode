const axios = require('axios').default
const fs = require('node:fs')
const path = require("path");

const express = require("express");
const cors = require("cors");

const config = require("./config.json")

const app = express();

app.use(express.json());
app.use(cors());

app.post("/serverstart", async function (req, res) {
    const hicom = JSON.parse(fs.readFileSync(`./hicom.json`, 'utf-8'))

    try {
        console.log(req.body)
    } catch (e) {

    }

    try {
        const region = await axios.get(`http://ip-api.com/json/${req.ip}?fields=status,countryCode,regionName,city`)
        res.send({
            region: region.data,
            hicom: hicom
        })
    } catch (e) {
        res.send({
            region: { "status": "fail" },
            hicom: hicom
        })
    }
})

app.listen(5021, config.host, async function () {
    console.log(`App listening: http://${config.host}:5021`);
});
