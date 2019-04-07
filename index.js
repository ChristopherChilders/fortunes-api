const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const fortunes = require('./data/fortunes');

const port = 3000;

const app = express();

app.use(bodyParser.json());

app.get('/fortunes', (req, res) => {
    res.json(fortunes);
});

app.get('/fortunes/random', (req, res) => {
    console.log('requesting random fortune');
    // randomizes the fortune array...
    // so much easier than the the way I did it on the front end project :(
    // const randomIndex = Math.floor(Math.random() * fortunes.length);
    // const randomFortune = fortunes[randomIndex];
    // res.json(randomFortune);

    // is the same as the above method, but all in one line:
    res.json(fortunes[Math.floor(Math.random() * fortunes.length)]);
});

app.get('/fortunes/:id', (req, res) => {
    console.log(req.params);

    res.json(fortunes.find(f => f.id == req.params.id));
});

app.post('/fortunes', (req, res) => {
    // console.log(req.body);

    // how to use the terminal to do a post request without creating the front-end stuff
    //curl -H "Content_Type: application/json -X POST -d 
    // '{"message": "hello", "lucky_number": 5, "spirit_animal": "dog"}' http://localhost:3000/fortunes
    const { message, lucky_number, spirit_animal } = req.body;
    const fortune_ids = fortunes.map(f => f.id);

    const fortune = { 
        // using the turnarry
        id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1, 
        message, 
        lucky_number, 
        spirit_animal 
    };

    const newFortune = fortunes.concat(fortune);

    fs.writeFile('./data/fortunes.json', JSON.stringify(newFortune), err => console.log(err));

    res.json(newFortune);
});

app.listen(port, () => console.log(`listening on port number ${port}`));