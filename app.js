const express = require ('express');
const mongoose = require ('mongoose');
const BlogModel = require('./models/blogs');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express(); //creates instance of the server

//database connection
const dbURI = 'mongodb+srv://arodidev:jameson@cluster0.bgfmg.mongodb.net/project-alpha?retryWrites=true&w=majority';
mongoose.connect(dbURI, 
    {useNewUrlParser: true, useUnifiedTopology: true}) //used to remove deprication warning (not very important)
    .then((result) => {
        app.listen(3000); //listen for requests after connection to db is succesful
        console.log("Connection to database successful, port 3000 listening for requests"); //confirms db connection
    })
    .catch((err => {
        console.log(err); //error catch
    }))
    
//setting up the view engine
app.set('view engine', 'ejs');

//middleware for static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //takes all url encoded data and passes into an object used in the POST request

//middleware for logging request properties to the console
// use of next() function
app.use((req, res, next) =>{ //app.use() executes for all requests coming from the client 
    console.log('new request made!!');
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);
    next(); //tells the server to execute next command for the request
})

//Blog Routes
app.use(blogRoutes);

//renders response for home page request
app.get('/', (req, res) =>{
    res.redirect('/blogs');
})

//renders response for about page request
app.get('/about', (req, res) =>{
    res.render('about', {title: 'about'});
})

//renders response for 404s
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found'});
})
