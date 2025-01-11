const express = require('express')
const app = express()
const server_config = require("./configs/server.config");
const db_config = require('./configs/db.config')
const mongoose = require('mongoose');
const user_model = require('./models/user.model');
const bcrypt = require('bcryptjs')
app.use(express.json())
//step2: now connect with the database
mongoose.connect(db_config.db_url);
const db = mongoose.connection
db.on('error', () => {
    console.log("error while connecting the database");
})
db.once('open', () => {
    console.log("database connected ....");
    init()
})
//step3: hear we create the admin when starting server
async function init() {
    try {
        const adminUser = await user_model.findOne({ email: 'aryanpatel1248@gmail.com' });
        if (adminUser) {
            console.log("admin user allredy exist...");
            return
        }
        //crete adminuser
        const newAdminUser = await user_model.create({
            name: 'aryan',
            email: 'aryanpatel1248@gmail.com',
            userType: 'admin',
            password: bcrypt.hashSync('aryan123', 8)
        })
        console.log("admin user created", newAdminUser)
    }
    catch (err) {
        console.log("erro while creating admin")
    }
}
//step1: start the server
app.listen(server_config.server_port, () => {
    console.log("server started at port number : ", server_config.server_port)
})