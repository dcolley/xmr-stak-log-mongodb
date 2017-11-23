

// Retrieve
var MongoClient = require('mongodb').MongoClient;
var schedule = require('node-schedule');
var request = require('request');
var moment = require('moment');

//var dateTimeFormat = 'YYYY-MM-DD HH:mm:ss'; // edit this to suite moment.js
var dateTimeFormat = ''; 

// API config
var api = {
	proto: 'http',
	ip: '192.168.1.107',
	port: '8080',
	path: '/api.json',
};

// Mongo config
var m = {
	proto: 'mongodb',
	ip: '192.168.1.4',
	port: '32768',
	db: 'xmr-stak-mon',
	// username: '', // TODO add this to the db connection string...
	// password: '',
};

// every 5 seconds...
schedule.scheduleJob('0,5,10,15,20,25,30,35,40,45,50,55 * * * * *', function(){

	// get the stats
	request( api.proto+'://'+api.ip+':'+api.port+api.path, function( err, res, body ) {
		if( err ) console.log( err );

		var log = JSON.parse( body );
		log.ip = api.ip;
		log.dateTime = moment.utc().format( dateTimeFormat );

		// Connect to the db
		MongoClient.connect(m.proto+'://'+m.ip+':'+m.port+'/'+m.db, function(err, db) {
			if(!err) {
				var collection = db.collection('Log');
				var res = collection.insert( log, function(err, res) {
					if( !err && res.result.ok ) {
						console.log( 'Log for '+api.ip+' / '+log.dateTime+' / '+res.ops[0]._id );
					}
				} );
			}
			db.close();
		});
	});

});
