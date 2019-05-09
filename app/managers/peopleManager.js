var fs = require('fs');
var parse = require('csv-parse');
const { orderBy } = require('lodash');
const knn = require('alike');

const options = {
    k: 10,
    weights: {
        age: 0.1,
        latitude: 0.05,
        longitude: 0.05,
        monthlyIncome: 0.3,
        experienced: 0.5
    }
}

const readCSV = new Promise((resolve, reject) => {
    const csvData = [];
    let skipFirstRow = true;
    fs.createReadStream('./app/utils/data.csv')
        .pipe(parse({ delimiter: ':' }))
        .on('data', csvrow => {
            const row = csvrow[0].split(',');
            if (skipFirstRow) {
                skipFirstRow = false;
            } else csvData.push({
                name: row[0],
                age: row[1],
                latitude: row[2],
                longitude: row[3],
                monthlyIncome: row[4],
                experienced: row[5] === 'true' ? 1 : 0
            });
        })
        .on('end', () => {
            resolve(csvData);
        })
        .on('error', err => {
            reject(err);
        });
});

const calculateScore = ({ age, latitude, longitude, monthlyIncome, experienced }) => item => {
    const scoreAge = getPercentage(age, item.age);
    const scoreLat = getPercentage(latitude, item.latitude);
    const scoreLon = getPercentage(longitude, item.longitude);
    const scoreInc = getPercentage(monthlyIncome, item.monthlyIncome);
    const scoreExp = experienced === item.experienced ? 1 : 0;
    const score = getAverage([scoreAge, scoreExp, scoreInc, scoreLat, scoreLon]);
    return { ...item, score }
};

const getPercentage = (val1_, val2_) => {
    if (isNaN(val1_) || isNaN(val2_))
        return 0;
    const val1 = Math.abs(val1_);
    const val2 = Math.abs(val2_);
    return val1 > val2 ? (val2 / val1) : (val1 / val2);
}

const getAverage = numberArr => {
    if (numberArr === undefined)
        return 0;
    if (numberArr.length === 0)
        return 0;
    const sum = numberArr.reduce((n, total) => total + n, 0);
    return (sum / numberArr.length).toFixed(1);
}

const findBestMatch = (benchMark, cvsData) => {
    return orderBy(knn(benchMark, cvsData, options)
        .map(calculateScore(benchMark)), ['score'], ['desc']);
}

module.exports = { readCSV, findBestMatch, getPercentage, getAverage };