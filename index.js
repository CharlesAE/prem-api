import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import standingsRoutes from './routes/standings.js';
import { updateAPIData } from './controller/standings.js';
import schedule from 'node-schedule';
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors({
    origin:  'https://the-prem.netlify.app',
    //origin: '*',
    methods: ['GET']
}));
app.get('/', standingsRoutes);

app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));
app.listen(process.env.PORT || PORT, () => console.log(`Listening on port ${PORT}`));

const rule = new schedule.RecurrenceRule();
rule.hour = 8;
rule.minute = 00;

const j = schedule.scheduleJob(rule, async () => {
    console.log('Job runs every day at 8:00AM');
    await updateAPIData().then( () => {

    });
  });
