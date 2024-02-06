console.log("With URL: http://localhost:5000/greet?name=John")
fetch('http://localhost:5000/greet?name=John')
//   .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));


console.log("With URL: http://localhost:5000/greet")
fetch('http://localhost:5000/greet')
//   .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));