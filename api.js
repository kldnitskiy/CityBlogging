//API
const fs = require('fs');
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

exports.api_manager = {
    render_template(template, response){
        
        fs.readFileSync('public/views/partials/'+template+'.hbs', 'utf8', function(err, contents) {
            response.send(contents)
});
    }
};
