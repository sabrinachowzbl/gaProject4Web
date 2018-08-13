const pg = require('pg');
const url = require('url');

if( process.env.DATABASE_URL ){

    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    //make the configs object
    var configs = {
      user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true
    };
  
  }else{
  
    //otherwise we are on the local network
    var configs = {
        user: 'sabrinachow',
        host: '127.0.0.1',
        database: 'happydead',
        port: 5432
    };
}

const poolObj = new pg.Pool(configs);

poolObj.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});

const userModel = require('./models/user');
// const appleModel = require('./models/app');
const userObj = userModel(poolObj);
// const appleObj = appleModel(poolObj);


module.exports = {
    user: userObj,
    pool: poolObj,
    // apple: appleObj
}