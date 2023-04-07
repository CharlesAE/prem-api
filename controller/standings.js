import fs from 'fs';
import axios from 'axios';




const APIKEY = '7d484f46cea3cc604d301da091cf3056';
const TABLE_URL = 'https://v3.football.api-sports.io/standings?league=39&season=2022';
const options = {
  headers : {
      "Content-Type": "application/json",
      "x-apisports-key" : APIKEY
  }
};
export const getStandings = (req, res) => {
    fs.readFile("./controller/stand.json", (err, jsonString) => {
        if (err) {
          console.log("Error:", err);
          return;
        } try {
            const tableJSON = JSON.parse(jsonString);
            const standings = JSON.stringify(tableJSON, null, 2);
            res.send(standings);
          } catch (err) {
            console.log("Error :", err);
          }
      });
}

const fetchStandings = async () => {
  const {data} = await axios.get(TABLE_URL, options);
  return data;
}

export const updateAPIData = async ()=> {
 fetchStandings().then((res) => {
  var obj = res.response[0].league.standings[0]; 
  var newstandings;
  var update = {};
  fs.readFile("./controller/stand.json", (err, jsonFile) => {
    if (err) {
      console.log("Error :", err);
      return;
    }
    try {
        const standings = JSON.parse(jsonFile);
        newstandings = standings.standings;

        const newstats = newstandings.map((current) => {
          const updated = obj.find((updated) => updated.team.id === current.team.id);

          if(updated) {
            return {...current, ...updated};
          }

          return current;
        });

        update.standings = newstats;

        //console.log(update.standings)
        fs.writeFileSync('./controller/stand.json', JSON.stringify(update, null, 2));
      } catch (err) {
        console.log("Error:", err);
      }
  });  
});
return;
}