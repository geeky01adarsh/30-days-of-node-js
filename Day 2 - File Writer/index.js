const fs = require("fs");  

function writeToFile(filePath, content) {
    try {
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`Content written to ${filePath}`);
    } catch (error) {
        console.error(`Error while writing to ${filePath}:`, error.message);
    }
}

console.log("========================\n Day 2 \n========================");
console.log("\nTest Case 1:")
writeToFile('test-files/output1.txt', 'Sample content.');

console.log("\nTest Case 2:")
writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');
