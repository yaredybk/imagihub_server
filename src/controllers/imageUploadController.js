const express = require("express");

const fs = require("fs");
const { _db } = require("../config/mysqlDB");
const path = require("path");

/**
 * image upload controller for anonymous
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns
 */
exports.uploadImageAnon = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    /**
     * An object representing an image file.
     * @typedef {Object} ImageFile
     * @property {string} name - The name of the image file.
     * @property {Buffer} data - The raw image data as a Buffer.
     * @property {number} size - The size of the image file in bytes.
     * @property {string} encoding - The encoding of the image data (e.g., '7bit').
     * @property {string} tempFilePath - The temporary file path where the image is stored (if applicable).
     * @property {boolean} truncated - Whether the image data is truncated.
     * @property {string} mimetype - The MIME type of the image (e.g., 'image/png').
     * @property {string} md5 - The MD5 hash of the image data.
     * @property {Function} mv - A function to move the image file to a new location. This function signature and behavior might vary depending on the underlying library/framework.
     */
    let imageFile = req.files.image;
    let splitName = imageFile.name.match(/^(.*)\.([a-zA-Z0-9]*)$/);
    if (!splitName)
        splitName = [
            "", // only needed to pass the "splitName.length != 3" below
            imageFile.name || new Date().toISOString(),
            imageFile.mimetype?.split("/").at(-1),
        ];
    if (!(splitName && splitName.length == 3)) return res.sendStatus(415);
    return _db
        .promise()
        .beginTransaction()
        .then((_) =>
            _db
                .promise()
                .query("call new_image(?, ?);", [splitName[1], splitName[2]])
        )
        .then(
            async (data) =>{
            let [[[r2]]] = data;
                return new Promise((resolve, reject) => {
                    if (!r2) return reject("new row not found");
                    imageFile.mv(
                        path.join(
                            __dirname,
                            `../../files/anon/images/${r2.dir}`
                        ),
                        function (err) {
                            if (err) reject(err);
                            else resolve(r2);
                        }
                    );
                })}
        )
        .then(async (r2) => {
            _db.commit();
	    res.status(201).send({
		new: r2,
		message: "upload complete",
	    });
        })
        .catch((e) => {
            _trace(e);
            res.sendStatus(500);
            fs.unlink(imageFile.tempFilePath, _trace);
            _db.rollback(_trace);
        });
};

/**
 * log an error call back function
 * @param {Error} e error to log
 */
function _trace(e) {
    e && console.trace(e);
}
