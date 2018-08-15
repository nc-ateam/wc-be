const https = require("https");

let URL = "https://web-crawler-test2.herokuapp.com";
let count=0
let pathsToSearch= []
let lastTier=''
let searchedTerms=[]


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
        
        
        for (let i=0; i<pathsToSearch.length; i++){
          console.log(pathsToSearch[i].pathNames, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
          // searchedTerms.push(pathsToSearch[i].pathNames);
          // console.log(">>>>>>>>>>>>>>>>>>>>>>.",searchedTerms)
          // searchedTerms.forEach(path => {
          //   if (path === pathsToSearch[i].pathNames){
          //     i++
          //   }
          // })
          console.log(pathsToSearch)

          if(response.statusCode === 404) {
            console.log(`here`)
            return recursFinder(`${URL}/public/${searchedTerms[0][i+1].pathNames}`);
          }
          lastTier = pathsToSearch[i].pathNames
         return recursFinder(`${URL}/public/${pathsToSearch[i].pathNames}`)
        }

        if (allHtml.length === 0) {
          console.log(lastTier);
          return recursFinder(`${URL}/public/${searchedTerms[0]}`);
        }
        
        console.log(pathsToSearch)
      });
    }
  )
  .on("error", err => {
    console.log("Error: " + err.message);
  });}


  recursFinder(URL)

module.exports={recursFinder}
