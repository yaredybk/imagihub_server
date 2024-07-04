const { _db } = require("./mysqlDB");
const path = require("path");
const fs = require("fs").promises;


/**
 * delete old images (2 hours old)
 * @param {{rootPath:string}} prop path for where the images are
 * @returns {Promise}
 * @example - DeleteOldImages().then(console.log).catch(console.trace);
 */
async function DeleteOldImages(prop = { rootPath: "/files/anon/images" }) {
    return _db
        .promise()
        .query(
            "select id_image, created_at, i_dir from imagihub_anon_v1.images_with_dir \
where created_at < (current_timestamp - INTERVAL 2 HOUR);"
        )
        .then(async ([r]) =>
            Promise.all(
                r.map(async ({ i_dir }, ind) => {
                    i_dir = path.join(
                        __dirname,
                        "../../files/anon/images",
                        i_dir
                    );
                    return fs
                        .access(i_dir, fs.constants.F_OK)
                        .then(async () => fs.unlink(i_dir))
						.catch(e=>null);
                })
            )
        )
        .then((r) => {
            return _db.promise().query(
                "delete from imagihub_anon_v1.images_with_dir \
			where created_at < (current_timestamp - INTERVAL 2 HOUR);"
            );
        })
        .catch((e) => console.trace(e));
}

module.exports={
	DeleteOldImages
}