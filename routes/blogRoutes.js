const express = require('express');
const router = express.Router();
const BlogModel = require('../models/blogs');

//// BLOG ROUTES
// POST requests
router.post('/blogs', (req, res) =>{
    const blogA = new BlogModel(req.body);
    blogA.save()
    .then((result) =>{
        res.redirect('/blogs');
    }).catch((err) =>{
        console.log(err);
    });
})

//GET requests
router.get('/blogs', (req, res) =>{
    BlogModel.find().sort({ createdAt: -1 }) //find() searches for all the documents that the model has access to, entire collection
    .then((result) =>{
        res.render('index', {title: 'Blogs', blogs: result}) // the blogs value was passed from the database
    })
    .catch((err) =>{
        console.log(err);
    })

})

//renders blogs by id
router.get('/blogs/:id', (req, res) =>{
    const id = req.params.id; //extracts id from the request object
    BlogModel.findById(id) //checks database for collection with the extracted id
    .then(result =>{
        res.render('details', { blog: result, title : 'Blog details'});
        console.log("The page has been rendered"); //renders the relevant view with the information from the obtained collection        
    })
    .catch(err =>{
        res.status(404).render('404', { title: "page not found"});
    })
})

router.get('/create', (req, res) =>{
    res.render('create', { title: 'Create Blog'})
})

////DELETE REQUESTS
//router for the delete request
router.delete('/blogs/:id', (req, res) =>{
    const id = req.params.id;
    BlogModel.findByIdAndDelete(id)
    .then((result) =>{
        res.json({ redirect : "/blogs"}); //  express does not allow redirecting after deleting, so it sends back json to the client and is executed for the redirect
    }).catch(err =>{
        console.log(err);
    })
})

module.exports = router;

/* NB
If the create route recieved /blogs/create instead of /create
then in the event that the /blogs/:id request is made,
who is to say that /create will not be read as the id?
So, in such an instance, the /blogs/create route handler should 
be placed above the route handler for /blogs/:id
because if not the server is going to look for a blog with
the id of create, which will not work.

NB
You can also opt to scope out the blogs in the app.js file
by adding '/blogs' as a parameter to the blogRoutes function then removing
/blogs from your request parameter.
*/