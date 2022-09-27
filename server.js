
const app = require("./app");
const config = require("./app/config");
const MongoDB = require ("./app/utils/mongodb.util");

//start server

async function startServer(){
    try {
        await MongoDB.connect(config.db.uri);
        console.log("connected to the database!");

        const PORT = config.app.port;
        app.listen(PORT, () =>{
            console.log(`Server is running on port ${PORT}.`);
        });

    }catch (error){
        console.log("Cannot connect to tho database",error);
        process.exit();
    }
}

startServer();

