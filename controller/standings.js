import fs from 'fs';

export const getStandings = (req, res) => {
    fs.readFile("./standings.json", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        try {
            const standings = JSON.parse(jsonString);
            res.send(standings);
          } catch (err) {
            console.log("Error parsing JSON string:", err);
          }
        
      })
}
