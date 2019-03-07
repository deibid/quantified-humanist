const express = require('express');

const path = require('path');
const Datastore = require('nedb');

const pathToData = path.resolve(__dirname, 'db/db');
const db = new Datastore({ filename: pathToData });

db.loadDatabase();

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const weather = require('weather-js');



app.listen(3030, () => {
    console.log("Go to https://locahost:3030");
});

app.get('/', (request, response) => {

    response.sendFile('record/index.html');

});

app.get('/entries', (request, response) => {


    db.find({}, (err, docs) => {
        if (err) return err;
        response.json(docs);
    });
});

app.post('/entries', (request, response) => {
    const unixCreateTime = new Date().getTime();
    let newEntry = Object.assign({ 'created': unixCreateTime }, request.body);

    db.insert(newEntry, (err, docs) => {
        if (err) return err;
        response.json(newEntry);
    });
});

app.get('/weather/', (request, response) => {

    weather.find({ search: "New York, NY", degreeType: "C" }, (err, results) => {

        if (err) console.log(err);

        let temp = results[0].current.temperature;
        response.json({ temperature: temp });

    });


});