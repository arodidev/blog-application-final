// const http = require ('http');
// const fs = require ('fs');
// const _ = require('lodash');

// const server = http.createServer((req, res) =>{
    
//     //lodash
//     const num = _.random(0, 20);
//     console.log (num);

//     const greet = _.once(() =>{
//         console.log("Hello there");
//     }
        
//     )

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

// server.listen(3000, 'localhost', () =>{
//     console.log('Listening on port 3000');
// });

//continuation from app.js
// how to render html files from express routes
// const express = require ('express');

// //express app
// const app = express(); //creates instance of the server

// //setting up the view engine
// app.set('view engine', 'ejs');

// //listen for requests
// app.listen(3000, () =>{
//     console.log('Listening for requests on port 3000');
// });

// app.get('/', (req, res) =>{
//     //res.send("<p>home page</p>");
//     res.sendFile('./views/index.html', {root: __dirname});
// })

// app.get('/about', (req, res) =>{
//     //res.send("<p>About</p>");
//     res.sendFile('./views/about.html', {root: __dirname});
//     console.log(req.url, req.method);
// })
// //redirects
// app.get('/about-us', (req, res) =>{
//     res.redirect('/about');
// })

// //404s
// app.use((req, res) => {
//     res.status(404).sendFile('./views/404.html', {root: __dirname});
// })

//// find() AND save() FUNCTIONS AS USED BY MONGOOSE
// app.get('/add-blog', (req, res) =>{
//     const blogA = new BlogModel({ //creates a new instance of the blog model we created in the schema file, this model contains various executable functions on the data
//         title: "New blog 2",
//         snippet: " another snippet about a different blog",
//         body: "This is all you need to know about my blog part 2"
//     });

//     blogA.save() //an asynchronous function in the model used to save the data to the database
//     .then((result) =>{
//         res.send(result); //sends a response to the browser which is the document saved in the database
//     })
//     .catch((err) =>{
//         console.log(err);
//     })
// })

// app.get('/all-blogs', (req, res) =>{
//     BlogModel.find() //finds all the documents in the collection
//     .then((result) =>{
//         res.send(result)
//     })
//     .catch((err) =>{
//         console.log(err);
//     })    
// })

// app.get('/single-blog', (req, res) =>{
//     BlogModel.findById('61c9cfc08ea29fe85971cac7')
//     .then((result) =>{
//         res.send(result);
//     })
//     .catch((err) =>{
//         console.log(err);
//     })
// })

/* N/B
when using the find() method, the operation is done
directly to the data in the document using the model,
whereas when we use the save() method,
the operation is done on the model instance created
*/

/* Practice example of how to pass an array to a view and use the data 

app.get('/', (req, res) =>{

    const blogs = [
        {title: 'Jamie learns node', snippet: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
        {title: 'Jamie going to church', snippet: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'},
        {title: 'Jamie is successful', snippet: 'cccccccccccccccccccccccccccccccccccccccccc'}
    ]

    res.render('index', { title: 'Home', blogs: blogs}); // blogs: blogs assigns the arrayName blogs to a random key called blogs
    // the above objects are used to pass values to the ejs file 

})

*/

/////// NEW FILE!! NEW FILE!! //////////
// app server before creating the express router (for learning purposes)


// const express = require ('express');
// const mongoose = require ('mongoose');
// const BlogModel = require('./models/blogs')

// //express app
// const app = express(); //creates instance of the server

// //database connection
// const dbURI = 'mongodb+srv://arodidev:jameson@cluster0.bgfmg.mongodb.net/project-alpha?retryWrites=true&w=majority';
// mongoose.connect(dbURI, 
//     {useNewUrlParser: true, useUnifiedTopology: true}) //used to remove deprication warning (not very important)
//     .then((result) => {
//         app.listen(3000); //listen for requests after connection to db is succesful
//         console.log("Connection to database successful, port 3000 listening for requests"); //confirms db connectin
//     })
//     .catch((err => {
//         console.log(err); //error catch
//     }))
    
// //setting up the view engine
// app.set('view engine', 'ejs');

// //mongoose and sandbox routes

// //middleware for static files
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true })); //takes all url encoded data and passes into an object used in the POST request

// //middleware for logging request properties to the console
// // use of next() function
// app.use((req, res, next) =>{ //app.use() executes for all requests coming from the client 
//     console.log('new request made:');
//     console.log('host:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);
//     next(); //tells the server to execute next command for the request
// })

// //// BLOG ROUTES
// // POST requests
// app.post('/blogs', (req, res) =>{
//     const blogA = new BlogModel(req.body);
//     blogA.save()
//     .then((result) =>{
//         res.redirect('/blogs');
//     }).catch((err) =>{
//         console.log(err);
//     });
// })

// //GET requests
// app.get('/blogs', (req, res) =>{
//     BlogModel.find().sort({ createdAt: -1 }) //find() searches for all the documents that the model has access to, entire collection
//     .then((result) =>{
//         res.render('index', {title: 'Blogs', blogs: result}) // the blogs value was passed from the database
//     })
//     .catch((err) =>{
//         console.log(err);
//     })
// })

// //renders blogs by id
// app.get('/blogs/:id', (req, res) =>{
//     const id = req.params.id; //extracts id from the request object
//     BlogModel.findById(id) //checks database for collection with the extracted id
//     .then(result =>{
//         res.render('details', { blog: result, title : 'Blog details'});
//         console.log("The page has been rendered"); //renders the relevant view with the information from the obtained collection        
//     })
//     .catch(err =>{
//         console.log(err);
//     })
// })

// //renders create page
// app.get('/create', (req, res) =>{
//     res.render('create', { title: 'Create Blog'})
// })

// //renders response for home page request
// app.get('/', (req, res) =>{
//     res.redirect('/blogs');
// })

// //renders response for about page request
// app.get('/about', (req, res) =>{
//     res.render('about', {title: 'about'});
// })

// ////DELETE REQUESTS
// //router for the delete request
// app.delete('/blogs/:id', (req, res) =>{
//     const id = req.params.id;
//     BlogModel.findByIdAndDelete(id)
//     .then((result) =>{
//         res.json({ redirect : "/blogs"}); //  express does not allow redirecting after deleting, so it sends back json to the client and is executed for the redirect
//     }).catch(err =>{
//         console.log(err);
//     })
// })

// //renders response for 404s
// app.use((req, res) => {
//     res.status(404).render('404', { title: 'Not found'});
// })
