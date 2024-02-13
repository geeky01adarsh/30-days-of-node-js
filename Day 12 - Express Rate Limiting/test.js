const fetch = require("node-fetch");

let reqNo = 1;
const makeApiCalls = async (req, res) => {
    fetch("http://localhost:5000")
        .then((res) => res.json())
        .then((data) => {console.log(`reqNo: ${reqNo++}, data: ${data}`)})
        .catch((err) => console.log(`reqNo: ${reqNo++}, error: ${err}`));
};

makeApiCalls();