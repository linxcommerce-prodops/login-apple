const express = require("express");
const routes = require("./app/routes")

const app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log("Running - port 3000")
});