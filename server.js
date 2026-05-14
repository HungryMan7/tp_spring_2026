const http = require('http');
const path = require('path')
const fs = require('fs')

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

http.createServer(function(request, response){

    const numberPath = path.join(__dirname, '/data', 'counter.json');
    const pagePath = path.join(__dirname, '/frontend', 'page.html');

    jsonString = fs.readFileSync(numberPath, 'utf-8')
    jsonNumber = JSON.parse(jsonString);

    if (request.url === '/styles.css') {
        const cssPath = path.join(__dirname, 'frontend', 'styles.css');
        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        
        response.writeHead(200, { 'Content-Type': 'text/css' });
        response.end(cssContent);
    }
    else if (request.url.includes('/increment')) {
      jsonNumber['number'] += 1;
      updateJSON = JSON.stringify(jsonNumber);
      fs.writeFileSync(numberPath, updateJSON, 'utf-8');
      response.writeHead(302, { 'Location': '/' });
      response.end();
    } else {
      currentNumber = fs.readFileSync(pagePath, 'utf-8');
      currentNumber = currentNumber.replace('#COUNTER#', jsonNumber['number']);
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(currentNumber);
    }

}).listen(port, hostname, function(){
    console.log("Сервер начал прослушивание запросов на порту 3000");
});