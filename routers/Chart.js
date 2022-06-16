require('dotenv').config({ path: '../.env' });
const DatabaseService = require('../services/DatabaseService')

var db;
const Chart = {

    init(app, dbo) {
        db = dbo

        //#region GET 
        app.get('/getChart/:token',
            this.getChart);
        app.get('/getInfoTokens',
            this.getInfoTokens);
        //#endregion

        //#region POST 
        //#endregion
    },

    //#region GET 
    async getChart(req, res) {
        var bars = []
        console.log(req.query)
        var from = parseInt(req.query.from)
        var to = parseInt(req.query.to)
        //{ from: '1655345148', to: '1655363148' }
        for (let i = from; i <= to; i = i + 60) {
            const bar = {
                time: i * 1000,
                open: getRandomInt(100, 100000),
                high: getRandomInt(100, 100000),
                low: getRandomInt(100, 100000),
                close: getRandomInt(100, 100000),
                isBarClosed: true,
                isLastBar: false,
            }
            bars.push(bar)
        }

        if (req.query.resolution === '1D') {
            bars = processTokenDay(bars)
        }

        // bars[bars.length - 1].isBarClosed = false
        // bars[bars.length - 1].isLastBar = true

        console.log(bars.length)
        console.log(req.params.token)

        //var bars = await DatabaseService.getChart(db, req.params.token, from, to)
        return res.status(200).send(bars)
    },

    async getInfoTokens(req, res) {
        var infoTokens = await DatabaseService.getInfoTokens(db)
        return res.status(200).send(infoTokens)
    }
    //#endregion

    //#region POST 
    //#endregion
}

// random interger from 1000 to 100000
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function processTokenDay(bars) {
    console.log("processTokenDay")
    console.log(bars.length)
    var openTime = bars[0].time
    var closeTime = openTime + 24 * 60 * 60 * 1000
    var listBarProcess = []
    var result = []

    for (let i = 0; i < bars.length; i++) {
        let bar = bars[i]

        if (bar.time <= closeTime) {
            listBarProcess.push(bar)
        } else {
            let dayBar = processRage(listBarProcess)
            result.push(dayBar)
            openTime = bar.time
            closeTime = openTime + 24 * 60 * 60 * 1000
            listBarProcess = []
            listBarProcess.push(bar)
        }
    }

    return result
}

function processRage(listBarProcess) {
    return bar = {
        time: listBarProcess[0].time,
        open: listBarProcess[0].open,
        high: Math.max.apply(null, listBarProcess.map(item => item.high)),
        low: Math.min.apply(null, listBarProcess.map(item => item.low)),
        close: listBarProcess[listBarProcess.length - 1].close,
        isBarClosed: true,
        isLastBar: false,
    }
}



module.exports = Chart