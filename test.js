const https = require('https');

let URL = 'https://web-crawler-test2.herokuapp.com';
const recurseIt = (URL, checked) => {
  https.get(URL, (response) => {
    let data = '';

    response.on('data', (information) => {
      data += information;
    });

    response.on('end', () => {
      dataArr = data.split('public/');
      let html = '.html>';
      let allHtml = dataArr
        .filter((item) => {
          if (item.includes(html)) {
            return item;
          }
        })
        .map((item) => {
          let res = item.split('>');
          return { pathName: res[0] };
        });

      allHtml.forEach((link) => {
        if (!checked.includes(link.pathName)) {
          checked.push(link.pathName);
          final.push(link.pathName);
          recurseIt(`${URL}/public/${link.pathName}`, checked);
        }
      });
    });
  });
};

console.log(recurseIt(URL, []));
