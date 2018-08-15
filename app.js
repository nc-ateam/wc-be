const https = require("https");

const recursFinder = (URL) =>{https
  .get(
    "https://web-crawler-test2.herokuapp.com",
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
            return res[0];
          });
        console.log(allHtml)
      });
    }
  )
  .on("error", err => {
    console.log("Error: " + err.message);
  });}