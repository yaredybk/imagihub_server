const fs = require("fs").promises; // Using promises for asynchronous operations

/**
 * create folders if not found
 * @param {Array<[string]>} foldersToCheck array of nested folders like
 * @example   checkAndCreateFolders(["files", "files/anon", "files/anon/image"],...)
 *                .then(() => console.log("All folders exist or created successfully."))
 *                .catch((error) => console.error("Error creating folders:", error));
 */
async function checkAndCreateFolders(foldersToCheck = []) {
    try {
        for (const folder of foldersToCheck) {
            await fs.access(folder, fs.constants.F_OK); // Check if folder exists
        }
    } catch (error) {
        // If any folder doesn't exist, create it recursively
        for (const folder of foldersToCheck) {
            await fs.mkdir(folder, { recursive: true });
            console.log(`Created folder: ${folder}`);
        }
    }
}

/**
 * create folders if not found
 * @param {Array<[[string]]>} foldersToCheck array of (array of nested folders like [["files", "files/anon", "files/anon/image"],...])
 * @example   checkAndCreateFolders(["files", "files/anon", "files/anon/image"])
 *                .then(() => console.log("All folders exist or created successfully."))
 *                .catch((error) => console.error("Error creating folders:", error));
 */
async function checkAndCreateMultipleFolders(foldersToCheck = [[]]) {
    try {
        for (const folders of foldersToCheck) {
            await checkAndCreateFolders(folders); // check array of folders
        }
    } catch (error) {
        console.trace(error);
    }
}
module.exports = { checkAndCreateFolders, checkAndCreateMultipleFolders };
