const path = require("path");

function resolvePath(relativePath) {
    const absolutePath = path.resolve(relativePath);
    console.log("Resolved Path:", absolutePath);
}

resolvePath("../project/folder/file.txt");
// Expected Output: Resolved Path: /Users/username/project/folder/file.txt

resolvePath("nonexistent-folder/file.txt");
// Expected Output: Resolved Path: /Users/username/nonexistent-folder/file.txt
