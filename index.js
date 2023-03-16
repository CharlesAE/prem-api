import express from 'express';
import bodyParser from 'body-parser';

import standingsRoutes from './routes/standings.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json(), (req, res,next) => {
//res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Origin', "*");
   res.header("Access-Control-Allow-Headers", "accept, content-type");
   //res.header("Access-Control-Max-Age", "1728000");
});
app.get('/', standingsRoutes);

app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));
app.listen(process.env.PORT || PORT, () => console.log(`Listening on port ${PORT}`))