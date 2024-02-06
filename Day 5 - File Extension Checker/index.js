// Create a function checkFileExtension(filePath, expectedExtension) that takes a file path and an expected file extension as input. The function should check if the file has the expected extension using the path module and print the result to the console.

const path = require("path");

function checkFileExtension(filePath, expectedExtension) {
    const extension = path.extname(filePath);
    if (extension === expectedExtension) {
        console.log(`File ${filePath} has extension ${expectedExtension}`);
    } else {
        console.log(`File ${filePath} does not have extension ${expectedExtension}. Expected: ${expectedExtension}, Actual: ${extension}`);
    }
}

checkFileExtension('test-files/file1.txt', '.txt');
// Expected Output: File has the expected extension: .txt

checkFileExtension('test-files/image.png', '.jpg');
// Expected Output: File does not have the expected extension. Expected: .jpg, Actual: .png