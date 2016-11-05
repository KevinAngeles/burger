// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
var express 	= require('express');
var bodyParser 	= require('body-parser');
var methodOverride = require('method-override')
var routes = require('./controllers/burgers_controller.js');
var exphbs = require('express-handlebars');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
//app.use(express.static(process.cwd() + '/public'));
app.use(express.static('public'));
// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance. 
    defaultLayout: 'main',
    helpers: {
        counter: function (index) {
			return index + 1;
		}
    }
});

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/', routes);

// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})