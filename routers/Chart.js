require('dotenv').config({ path: '../.env' });
const DatabaseService = require('../services/DatabaseService')

var db;
const Chart = {

    init(app, dbo) {
        db = dbo

        //#region GET 
        app.get('/getChart/:token',
            this.getChart);
        //#endregion

        //#region POST 
        //#endregion
    },

    //#region GET 
    async getChart(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).send({ success: false, msg: errors.array()[0].msg });
        }

        var bars = []

        for (let i = 1629331200 - 1000000; i <= 1655337600 + 1000000; i = i + 60) {
            const bar = {
                time: i * 1000,
                open: getRandomInt(1000, 100000),
                high: getRandomInt(1000, 100000),
                low: getRandomInt(1000, 100000),
                close: getRandomInt(1000, 100000),
                isBarClosed: true,
                isLastBar: false,
            }
            bars.push(bar)
        }

        bars[bars.length - 1].isBarClosed = false
        bars[bars.length - 1].isLastBar = true

        console.log(bars.length)
        console.log(req.params.token)

        //var bars = await DatabaseService.getChart(db, req.params.token)
        return res.status(200).send(bars)
    }
    //#endregion

    //#region POST 
    //#endregion
}

// random interger from 1000 to 100000
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



module.exports = Chart