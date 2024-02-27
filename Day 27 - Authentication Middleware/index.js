const express = require('express');
const app = express();
const port = 5000;


function authenticateAndAuthorizeAdmin(req, res, next) {
    // jwt token check in case of implementation
    const {role} = req.headers;
    if(role === 'admin'){
        next();
    }else{
        res.status(401).send('Unauthorized');
    }
}

function authenticateAndAuthorizeUser(req, res, next) {
    // jwt token check in case of implementation
    const {role} = req.headers;
    if(role === 'user'){
        next();
    } else{
        res.status(401).send('Unauthorized');
    }
}


app.get('/users', authenticateAndAuthorizeUser, (req, res) => {
    res.status(200).json({message: 'Authorized', data: 'This route is only for users', user_type: 'user'});
})

app.get('/admins', authenticateAndAuthorizeAdmin, (req, res) => {
    res.status(200).json({message: 'Authorized', data: 'This route is only for admins' ,user_type: 'user'});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})