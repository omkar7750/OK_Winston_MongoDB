

const winston = require("winston"),
winsteinMongo = require('../lib/winston-mongodb'),
logger = new (winston.Logger)(
    {
        //level:"debug",
        levels:{ 
                 error: 0,  warn: 1,  info: 3, data: 3,
                 verbose: 5, debug: 6, silly: 7, heartbeat: 8
        },
        colors: {
                data: 'black', heartbeat: 'green'
        },
        transports:  [
            new (winston.transports.Console)({
                prettyPrint: true,
                colorize: true,
                json: false,
                level: "heartbeat",
                //handleExceptions : true,
                timestamp: function() {
                    return Date.now();
                }
            }),
        
            new (winston.transports.MongoDB)({

                name               : process.env.name || 'testlogs',
                db                 :  process.env.db,
                collection         : process.env.collection || 'myLogs',
                level              : 'heartbeat'
            })
        ],
        exitOnError: false
    }
);


var ind = 2000;
for(let i =0; i<ind; i++){
    logger.warn("just some message : ",i);
}


module.exports = logger;
