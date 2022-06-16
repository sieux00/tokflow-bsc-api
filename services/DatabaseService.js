require('dotenv').config({ path: '../.env' });

const DatabaseService = {
    getChart(dbo, token, from, to) {
        return new Promise((resolve, reject) => {
            dbo.collection("prices_minutes")
                .find({ token, openTime: { $gte: from, $lte: to } })
                .sort({ openTime: 1 })
                .limit(2000)
                .toArray((err, docs) => {
                    if (err) return resolve([])
                    resolve(docs)
                })
        })
    },

    getInfoTokens(dbo) {
        return new Promise((resolve, reject) => {
            dbo.collection("tokens")
                .find({})
                .toArray((err, docs) => {
                    if (err) return resolve([])
                    resolve(docs)
                })
        })
    }
}

module.exports = DatabaseService