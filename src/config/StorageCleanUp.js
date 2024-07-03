const { _db } = require("./mysqlDB");
const path = require('path')

async function DeleteOldImages({rootPath="/files/anon/images"}) {
    
    _db.promise()
    .query('select created_at, i_dir from imagihub.images_with_dir \
	    where created_at < (current_timestamp - INTERVAL 2 HOUR);')
	.then((r)=>{
		console.log(r)
	})
}
console.log(__dirname)
console.log(path.join(__dirname, "/files/anon/images"))

DeleteOldImages();
