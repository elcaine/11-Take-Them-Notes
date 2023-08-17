const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4001;

app.get('/', (req, res)=>{
    res.status(200).json({
        result: 'Helllllloooooo dummy'
    });
});

app.listen(port, ()=>{
    console.log(`App be running running runnnnning... running on port: ${port}`);
});