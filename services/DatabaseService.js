require('dotenv').config({ path: '../.env' });

const DatabaseService = {
    getChart(dbo, token) {
        return new Promise((resolve, reject) => {
            dbo.collection("prices_minutes")
                .find({ token })
                .sort({ openTime: 1 })
                .toArray((err, docs) => {
                    if (err) return resolve([])
                    resolve(docs)
                })
        })


    },
}

module.exports = DatabaseService