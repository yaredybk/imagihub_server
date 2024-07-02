/**
 * run this setup before starting the server
 */

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
        .then(() => console.log("All folders exist or created successfully."))
        .catch((error) => console.error("Error creating folders:", error));
}

module.exports = {setUp}