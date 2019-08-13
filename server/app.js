
'use strict';

require('dotenv').config();

const
    express             = require('express'),
    app                 = express(),
    path                = require('path'),
    Twig                = require('twig');

// :: Static files
app.use('/pub', express.static(path.resolve(__dirname, './public/pub')));

// :: Redirect
app.get('/', (req, res) => {
    res.redirect('/app');
});

// :: Render an actual HTML template rather than letting webpack piss directly into our face
app.get(['/app', '/app/*'], (req, res) => {
    Twig.renderFile('./layouts/app.html', {}, (err, html) => {
        if (!err) res.send(html);
        else next(err);
    });
});

// :: Oh no
app.use('/', (req, res, next) => {
  res.status(404).json('File not found');
});

// :: GO
var port = process.env.PORT || 3000;
app.listen(port);
console.log('server listening on port', + port);
