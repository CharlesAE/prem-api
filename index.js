import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import standingsRoutes from './routes/standings.js';
import { updateAPIData } from './controller/standings.js';
import fs from 'fs';
const app = express();
const PORT = 5000;
let testStandings = []
app.use(bodyParser.json());

/*
fetchStandings().then((res) => {
              //console.log(res.response[0].league.standings[0]);
             testStandings = res.response[0].league.standings[0];
             console.log(testStandings);
             
            
             
          });
          */
app.use(cors({
    origin:  'https://the-prem.netlify.app',
    //origin: '*',
    methods: ['GET']
}));
app.get('/', standingsRoutes);

app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));
app.listen(process.env.PORT || PORT, () => console.log(`Listening on port ${PORT}`));
await updateAPIData().then( () => {

});
