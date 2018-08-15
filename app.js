const https = require("https");

let staticURL = "https://web-crawler-test2.herokuapp.com";
let count = 0;
let pathsToSearch = [];
let lastTier = "";
let searchedTerms = [];

const recursFinder = (URL, name) => {
  https
    .get(URL, response => {
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
            return { pathName: res[0] };
          });
        let htmlToAdd = allHtml.filter(item => {
          return !searchedTerms.includes(item);
        });
        pathsToSearch = pathsToSearch.concat(htmlToAdd);

        pathsToSearch.forEach((urlToSearch, index) => {
          if (searchedTerms.length === 0) {
            searchedTerms.push(urlToSearch);
            console.log("boop");
            return recursFinder(`${staticURL}/public/${urlToSearch.pathName}`);
          }
          for (let i = 0; i < searchedTerms.length; i++) {
            if (!searchedTerms.includes(urlToSearch.pathName)) {
              searchedTerms.push(urlToSearch);
              return recursFinder(
                `${staticURL}/public/${urlToSearch.pathName}`
              );
            }
            i++;
          }
        });
      });
    })
    .on("error", err => {
      console.log("Error: " + err.message);
    });
};

recursFinder(staticURL);

module.exports = { recursFinder };
