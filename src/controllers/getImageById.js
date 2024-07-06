const express = require("express");
const { _db } = require("../config/mysqlDB");

/**
 * @param {express.Request} rq express request object
 * @param {express.Response} rs express response object
 * @param {express.NextFunction} nx express next function
 */
async function getImageById(rq, rs, nx) {
    let { id } = rq.params;
    if (!id || !id.match(/[a-zA-Z0-9]{4}/)) {
        rs.statusMessage("invalid ID");
        return rs.status(400).sendStatus("invalid ID");
    }
    _db.promise()
        .query(
            `select concat(i_name,".",i_ext) as name,i_dir as dir,i_affix as id \
    from images_with_dir where i_affix = '${id}';`
        )
        .then((d) => {
            let [[r]] = d;
            if (r) return rs.send(r);
            nx();
        })
        .catch((e) => {
            console.trace(e);
            nx();
        });
}

module.exports = { getImageById };
