require("dotenv").config()
const server = require("./src/app");
const {db} = require("./src/db");

server.set("port", process.env.PORT || 8000);

db.sync({ force: false }).then(() => {
    server.listen(server.get("port"), () => {
        console.log(`%s listening at ${server.get("port")}`);
    })
});