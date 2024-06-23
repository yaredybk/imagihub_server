require("dotenv").config();
const mysql2 = require("mysql2");
const mysql2Promise = require("mysql2/promise");
let connectConfig = {
    host: process.env.DB_ANON_HOST,
    user: process.env.DB_ANON_USER,
    password: process.env.DB_ANON_PASSWORD,
    // password: "123",
    database: process.env.DB_ANON_DB,
    dateStrings: true,
    // rowsAsArray: true,
};
/**
 * mysql2 db instance
 * @type {mysql2.Connection} _db
 */
let _db;


/**
 * connectToDB
 */
async function connectToDB() {
    try {
            _db = mysql2.createConnection(connectConfig);
            _db.connect((err) => {
                if (err) {
                    if (err.code == "ETIMEDOUT") return reconnectToDB();
                    console.error(">-BOOT MYSQL _db-<\n", err);
                    return reconnectToDB();
                } else {
                    _db.on("error", function (err) {
                        if (
                            err.code === "ETIMEDOUT" ||
                            err.code === "ETIMEOUT" ||
                            err.code === "PROTOCOL_CONNECTION_LOST" ||
                            err.code == 4031
                        ) {
                            reconnectToDB();
                        } else {
                            console.trace( err);
                            reconnectToDB(10000);
                        }
                    });
                }
            });
    } catch (error) {
        console.trace(">-MYSQL-<\n", error);
    }
}
/**
 * reconnectToDB
 * @param {int} timeout timeout in miliseconds
 */
async function reconnectToDB(timeout = 5000) {
    setTimeout(() => {
        connectToDB();
    }, timeout);
}
connectToDB();

module.exports = {_db,_dbPromise:_db.promise}