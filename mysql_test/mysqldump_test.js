const mysqldump = require('mysqldump')
mysqldump({
    connection: {
        host: 'localhost',
        user: 'root',
        password: '2Xuiglji',
        database: 'classicmodels',
    },
    dumpToFile: './dump.sql',
});