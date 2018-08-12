console.log('starting the server... :)');



/*
    *************************************************************
    *************************************************************
    *************************************************************

                    require libraries

    *************************************************************
    *************************************************************
    *************************************************************
    *************************************************************
*/

const db = require('./db.js');

const cookieParser = require('cookie-parser');

const reactEngine = require('express-react-views').createEngine();

const jsonfile = require('jsonfile');

const methodOverride = require('method-override');

const socket = require('socket.io');

// const pg = require('pg');

const sha256 = require('js-sha256');

/*
    *************************************************************
    *************************************************************
    *************************************************************

                    DB setup

    *************************************************************
    *************************************************************
    *************************************************************
    *************************************************************
*/

// const configs = {
//     user: 'sabrinachow',
//     host: '127.0.0.1',
//     database: 'wireFrame',
//     port: 5432
// }

// const pool = new pg.Pool(configs);

// pool.on('error', function(err) {
//     console.log('idle client error', err.message, err.stack);
// });


/*
    *************************************************************
    *************************************************************
    *************************************************************

                    express setup

    *************************************************************
    *************************************************************
    *************************************************************
    *************************************************************
*/

const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(cookieParser());

// look in the views directory for all the templates
app.set('views', __dirname + '/views');
// use the react engine in express
app.engine('jsx', reactEngine);
// this line sets react to be the default view engine
app.set('view engine', 'jsx');

//tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

//socket setup
var io = socket(server);

/*
    *************************************************************
    *************************************************************
    *************************************************************

                    		routes

    *************************************************************
    *************************************************************
    *************************************************************
    *************************************************************
*/

require('./routes')(app, db, io);


/**
 * ===================================
 *     What the Fuck is going on? 
 * ===================================
 */

// var url = require('url');
//     ev = new events.EventEmitter()

// // <ns name>: <ns regexp>
// var routes = {
//   // /user/:id
//   'drawingBoard': '^\\/drawingBoard\\/(\\d+)$',

//   // /:something/:id
//   'default': '^\\/(\\\w+)\\/(\\d+)$'
// };

// // global entry point for new connections
// io.on('connection', function (socket) {
//   // extract namespace from connected url query param 'ns'
//   var ns = url.parse(socket.handshake.url, true).query.ns;
//   console.log('connected ns: '+ns)

//   //
//   for (var k in routes) {
//     var routeName = k;
//     var routeRegexp = new RegExp(routes[k]);

//     // if connected ns matched with route regexp
//     if (ns.match(routeRegexp)) {
//       console.log('matched: '+routeName)

//       // create new namespace (or use previously created)
//       io.of(ns).on('connection', function (socket) {
//         // fire event when socket connecting
//         ev.emit('socket.connection route.'+routeName, socket);

//         // @todo: add more if needed
//         // on('message') -> ev.emit(...)
//       });

//       break;
//     }
//   }

//   // when nothing matched
//   // ...
// });

// // event when socket connected in 'user' namespace
// ev.on('socket.connection route.user', function () {
//   console.log('route[user] connecting..');
// });

// // event when socket connected in 'default' namespace
// ev.on('socket.connection route.default', function () {
//   console.log('route[default] connecting..');
// });



// Run clean up actions when server shuts down
server.on('close', () => {
  console.log('Closed express server');
  // close database connection pool
});