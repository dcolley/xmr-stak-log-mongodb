## Synopsis

Grab the output from xmr-stak[-cpu|-gpu] http://localhost/api.json and pass to a MongoDB

## Motivation

Use MongoDB to generate reports

## Requirements

* https://nodejs.org/
* https://github.com/node-schedule/node-schedule
* https://github.com/request/request

Optional:

* https://github.com/foreverjs/forever

## Installation

git clone https://github.com/dcolley/xmr-stak-log-mongodb [dirname]

cd [xmr-stak-log-mongodb|dirname]

npm update

## Configuration

edit the index.js
```
// API config
var api = {
	proto: 'http',
	ip: '192.168.1.107',  // the host running xmr-stak
	port: '8080',         // from xmr-stak/config.txt
	path: '/api.json',
};

// Mongo config
var m = {
	proto: 'mongodb',
	ip: '192.168.1.4',    // the host running MongoDB
	port: '27017',        // MongoDB port
	db: 'xmr-stak',
	// username: '',      // TODO add this to the db connection string...
	// password: '',
};
```

## Run

node index.js

Also, you could run this with https://github.com/foreverjs/forever

## Contributors

Please clone the repo, add any improvements, and then submit a pull request.

## Credits

* https://github.com/fireice-uk/xmr-stak-cpu
* https://github.com/node-schedule/node-schedule

## License

GPL-3
