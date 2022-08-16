console.log(`${process.env.DB_KEY}`)

module.exports={
  "developmentRemote": {
    "username": "uxqfkay4mojjyps6",
    "password": "7kCKVDv8ZuMiBHLbR3L7",
    "database": "bdeb7rgjsoygdjqjjjkh",
    "host": "bdeb7rgjsoygdjqjjjkh-mysql.services.clever-cloud.com",
    "dialect": "mysql",
    // "pool":{"max": 4}

  },
  "development": {
    "username":"root",
     "password": `${process.env.DB_KEY}`,
     "database": "kletaDB",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
