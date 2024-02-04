const fs = require("fs");

function readFileContent(filePath) {
    try {
        const input = fs.readFileSync(filePath, "utf8");
        console.log(`Content of ${filePath}:`, input)
        return input;
    } catch (error) {
        console.error(`Error while readFileContent of ${filePath}:`, error.message);
        return error.message;
    }
}

console.log("========================\n Day1 \n========================");

console.log("Parsing file 1:\n")
readFileContent("test-files/file1.txt");
// Expected Output: Content of file1.txt
console.log("\n")

console.log("Parsing empty file:\n")
readFileContent("test-files/empty-file.txt");
// Expected Output: (empty string)
console.log("\n")

console.log("Parsing non-existant file:\n")
readFileContent("test-files/nonexistent-file.txt");
// Expected Output: Error reading file: ENOENT: no such file or directory...
