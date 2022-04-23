const mongoose = require ('mongoose');
const Schema = mongoose.Schema; // constructor function used to create a new schema instance

const blogSchema = new Schema({ //used to create schema
    title: {
        type: String,
        required:true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true });

const BlogModel = mongoose.model('Blog', blogSchema); //creates a model for the blog schema created
/* when an instance of this model is created,
 it will also create a collection (a file of documents) in the specified database with the name
 of the file passed into the model as an arguement, ie 'Blog' in this case 
 and will create a collection called blogs (pluralizes the name passed to it) */

module.exports = BlogModel;