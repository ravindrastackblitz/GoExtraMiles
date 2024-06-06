const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const app = express();
const port = 8800;

app.use(express.json());

app.post('/api/extramail',(req,res)=>{
    console.log(req.body);
    res.redirect('http://localhost:4200/phone/');
});

app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`);
});

