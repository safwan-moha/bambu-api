const express = require('express');
const { readCSV, findBestMatch } = require('../managers/peopleManager');

const peopleRouter = express.Router()

peopleRouter.get('/', (req, res) => {
    const { age, latitude, longitude, monthlyIncome, experienced } = req.query;

    const benchMark = {};
    if (age != undefined)
        benchMark.age = age;
    if (latitude != undefined)
        benchMark.latitude = latitude;
    if (longitude != undefined)
        benchMark.longitude = longitude;
    if (monthlyIncome != undefined)
        benchMark.monthlyIncome = monthlyIncome;
    if (experienced != undefined)
        benchMark.experienced = experienced;

    readCSV.then(cvsData => {
        const matches = findBestMatch(benchMark, cvsData);
        res.send(matches);
    });
})


module.exports = peopleRouter;