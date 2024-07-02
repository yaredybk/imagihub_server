// const { _db } = require("./mysqlDB");
const path = require('path')

async function DeleteOldImages({rootPath="/files/anon/images"}) {
    
    _db.promise()
    .query('select created_at, i_dir from imagihub.images ')
}
console.log(__dirname)
console.log(path.join(__dirname, "/files/anon/images"))