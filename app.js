const https = require("https");

https.get("https://web-crawler-test2.herokuapp.com/", (response) => {
  let data='';

  response.on("data", (information) => {
    data+= information;
  });

response.on("end", () =>{
  console.log(data);
})
}).on("error", (err) =>{
  console.log("Error: "+ err.message)
});