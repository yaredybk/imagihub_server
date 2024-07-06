require("dotenv").config();
const express = require("express");
/**
 * checks if session.failedRetries is abouve tresh-hold and returns 429
 * @param {express.Request} rq express request object
 * @param {express.Response} rs express response object
 * @param {express.NextFunction} nx express next function
 */
async function LimitFailedRetries(rq, rs, nx) {
    if (
        rq.session.failedRetries &&
        rq.session.failedRetries > process.env.LIMIT_RETRY
    ) {
        rs.statusMessage = "Too many failed retries";
        rs.status(429).send("Too many failed retries");
    } else {
        nx();
    }
}
/**
 * increments the session.failedRetries every time and sends 400/not found response
 * @param {express.Request} rq express request object
 * @param {express.Response} rs express response object
 */
async function CountFailedRetries(rq, rs) {
    rq.session.failedRetries = (rq.session.failedRetries || 0) + 1;
    rs.sendStatus(400);
}

module.exports = {
    LimitFailedRetries,
    CountFailedRetries,
};
