// const greet = (name) => {
//     console.log(`hello, ${name}`);
// }

// greet ("Jamie");
// greet ("Arodi");

// console.log(global);
// setTimeout(() => {
//     console.log("Hello there after all this time");
//     clearInterval(int);
// }, 3000);

// const int = setInterval(() => {
//     console.log("another interval");
// }, 100);

// console.log(__dirname);
// console.log(__filename);

// const people = ["yoshi", "Amerix", "Maya"];
// const ages = [20, 30, 40];

// module.exports = {
//     people,
//     ages};

// console.log("test logged");

//file system
//reading files

// const fs = require('fs');
// const { Server } = require('http');

// fs.readFile('./docs/blog1.txt', (err, data)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log(data.toString());
// });

// console.log("last line of code"); used to test for asynchronous

//writing files
// fs.writeFile('./docs/blog1.txt', "hello world", ()=>{
//     console.log("file was written");
// });

// fs.writeFile('./docs/blog2.txt', "hello Jesus my old firend", ()=>{
//     console.log("file was written");
// });

//directories
// if(!fs.existsSync('./assets')){
//     fs.mkdir('./assets', (err) => {
//         if (err){
//             console.log (err);
//         }
//         console.log('folder created');
//     });
// }

// else {
//     fs.rmdir('./assets', (err) =>{
//         if(err){
//             console.log (err);
//         }
//         console.log('folder created');
//     })
// }

//deleting files
// if (fs.existsSync('./docs/deleteme.txt')){
//     fs.unlink('./docs/deleteme.txt', (err) =>{
//         if (err) {
//             console.log(err)
//         }
//         console.log('the file has been deleted');
//     })
// }
  
//streams and buffers
// const readStream = fs.createReadStream('./docs/blog1.txt', { encoding: 'utf-8'});
// const writeStream = fs.createWriteStream('./docs/blog4.txt');

// read stream
// readStream.on('data', (chunk) => {
//     console.log('...NEW CHUNK...');
//     console.log(chunk);
// });

//write stream
// readStream.on('data', (chunk) =>{
//     console.log('..NEW CHUNK..');
//     console.log(chunk);
//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// })

//piping
// readStream.pipe(writeStream);

//path module
// const path = require ('path');
// const pathObj = path.parse(__filename);
// console.log(pathObj);
// console.log(pathObj.name);

// http Server

//set header content type
// res.setHeader('Content-Type', 'text/html');

// res.write('<head><link rel = "stylesheet" href = "#"></link></head>');
// res.write('<p>hello my ninjas</p>');
// res.write('<p>hello my ninjas still ninjaing</p>');
// res.end();

//basic routing without express

// const server = http.createServer((req, res) =>{
//     console.log(req.url, req.method);
//     console.log('request logged');

//     //set header content type
//     res.setHeader('Content-Type', 'text/html');

//     //creating the routes
//     let path = './views/';
//     switch(req.url){
//         case '/':
//             path += 'index.html';
//             res.statusCode = 200;
//             break;
//         case '/about':
//             path += 'about.html';
//             res.statusCode = 200;
//             break;
//         case '/about-me':
//             res.statusCode = 301;
//             res.setHeader('Location', '/about');
//             res.end();
//             break;
//         default:
//             path += '404.html';
//             res.statusCode = 404;
//             break;
//     }

//     //writing an html file
//     fs.readFile(path, (err, data) =>{
//         if(err){
//             console.log(err)
//             res.end();
//         }
//         else{
//             res.write(data);
//             res.end();
//         }
//     });

// });