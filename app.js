require('dotenv').config();
const express = require('express')
const app = express();
const PORT = 5002

const mongodb = require('./db')
const bodyParser = require("body-parser");
const cors = require('cors');

const Chart = require('./routers/Chart')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.options('*', cors())

const init = async () => {
    const dbo = await mongodb.connect();

    Chart.init(app, dbo)
    
    app.get('/', (req, res) => {
        return res.send('API');
    });

    app.listen(PORT, () =>
        console.log(`App listening on port ${PORT}!`),
    );
}

init()