const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const domain = process.argv[2];
const path = process.argv[3];

const fetchUrlAndSave = function(){

  request(domain, (error, response, body) => {
    if (error) { //if the url is invalid
      console.log("Error:", error);
      rl.close();
    }

    // fs.access(path, fs.constants.R_OK, (err) => {
    //   rl.question("File already exists! Do you want to overwrite it? (Enter Y to overwrite)", answer => {
    //     if (!answer.toUpperCase === 'Y') {
    //       rl.close();
    //     }
    //   })
    // });
    
    fs.writeFile(`${path}`, body, error => {
      if (error) {
        console.error(error);
        return;
      }
      
      const fileSize = fs.statSync(path).size;
      
      console.log(`Downloaded and saved ${fileSize} to ${path}`)
    });
    
  })
}