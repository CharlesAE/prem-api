import express from 'express';
import bodyParser from 'body-parser';

import standingsRoutes from './routes/standings.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.get('/', standingsRoutes);

app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));
app.listen(process.env.PORT || PORT, () => console.log(`Listening on port ${port}`))