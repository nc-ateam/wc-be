const https = require("https");

let URL = "https://web-crawler-test2.herokuapp.com";
let count=0
let pathsToSearch= []


const recursFinder = (URL) =>{
  https
  .get(
    URL,
    response => {
      let data = "";
      response.on("data", information => {
        data += information;
      });
      response.on("end", () => {
        dataArr = data.split("public/");
        let html = ".html>";
        let allHtml = dataArr
          .filter(item => {
            if (item.includes(html)) {
              return item;
            }
          })
          .map(item => {
            let res = item.split(">");
            return {pathNames : res[0]};
          });
        pathsToSearch = allHtml
        if(allHtml.length===0){count++}
        let firstSearch = false;
        console.log(pathsToSearch)
      });
    }
  )
  .on("error", err => {
    console.log("Error: " + err.message);
  });}


  recursFinder(URL)
