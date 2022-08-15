const http = require('http');
const fs = require('fs');
const qs = require('qs');

const server = http.createServer((req, res)=>{
  let dataFile = '';
  let html = '';
  fs.readFile('./data.json','utf-8',(err, data)=>{
      if(err){
          throw new Error(err.message);
      }
      dataFile = JSON.parse(data);
      for (let i = 0; i < dataFile.length; i++) {
          html += '<tr>'
          html += `<td>${dataFile[i].id}</td>`
          html += `<td>${dataFile[i].name}</td>`
          html += `<td>${dataFile[i].price}</td>`
          html += `<td><button class="btn btn-danger">Delete</button></td>`
          html += `<td><button class="btn btn-primary">Update</button></td>`
          html += '</tr>'
      }
  })

    fs.readFile('./views/views.html','utf-8',(err, data)=>{
        if(err){
            console.log(err.message)
        }
        res.writeHead(200,{'Content-type':'text/html'});
        data = data.replace('{list-device}',html)
        res.write(data);
        res.end();
    })
})

server.listen(3000,()=>{
    console.log(`Server is running at http://localhost:3000`);
})