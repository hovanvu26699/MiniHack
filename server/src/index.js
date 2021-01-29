const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const usersRoute = require('./routes/users.route');
const loginRoute = require('./routes/login.route');
const postRoute = require('./routes/posts.route');


const app = express();
const port = 3000

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/social-network-app', (err) => {
    if (err) {
        console.log(`Cannot connect to mongodb: ${err.toString()}`)
    }
});

app.use("/users", usersRoute);
app.use("/login", loginRoute);
app.use("/post", postRoute);
app.use("/put", postRoute);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})