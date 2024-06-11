const express = require('express');
const path = require('path');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine.js');
const webRoutes = require('./routes/web.js');
const apiRoute = require("./routes/api.js");
const app = express();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;
const cors = require('cors');
app.use("/public", express.static(path.join(__dirname, "public")));
const bodyParser = require('body-parser');
const connection = require('./config/dataBase.js');

app.use(cors());

//config json api
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());




//configViewEngine
configViewEngine(app);


//used router
app.use('/', webRoutes);
app.use("/api/v1/", apiRoute);

app.listen(port, () => {
    console.log(`Example app listening on port http://${hostname}:${port}`);
});