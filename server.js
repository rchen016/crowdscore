// server.js

const express = require('express');
const app = express();
const path = require('path');

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});
