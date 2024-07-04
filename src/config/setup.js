/**
 * run this setup before starting the server
 */

const { DeleteOldImages } = require("./StorageCleanUp");
const { checkAndCreateMultipleFolders } = require("./setUpFolders");

/**
 * SETUP server
 */
async function setUp() {
    // folders to create
    let folders = [
        ["bin"],
        ["files", "files/anon", "files/anon/images"],
        ["tmp"],
    ];
    await checkAndCreateMultipleFolders(folders)
        .then(() =>
            console.log("-> All folders exist or created successfully.")
        )
        .catch((error) => console.error("Error creating folders:", error));
    await DeleteOldImages()
        .then((_) => console.log("-> deleted old images"))
        .catch(console.trace);
    setInterval(() => {
        DeleteOldImages()
            .then((_) => console.log("-> deleted old images"))
            .catch(console.trace);
    }, 20 * 60 * 1000);
    console.log("-> delete scheduled at every 20 minitues")
}

module.exports = { setUp };
