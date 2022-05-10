const express = require("express");
const app = express();
const EventEmitter = require("events");
const event = new EventEmitter();

app.use(express.static("public"));

app.get("/", (_,res) => res.sendFile("/index.html"));

let i = 0 ;

app.get("/streams", (req,res) => {
    res.setHeader("Content-Type", "text/event-stream");
    sendEventStreams(res);
})

// send notification to the client everytime new data is added in the database
app.get("/notifications", (req,res) => {
    res.setHeader("Content-Type", "text/event-stream");
    event.on("newDataAdded", (data) => {
        res.write("data: " + `${data}\n\n`);
    })
})

function sendEventStreams(res) {
    res.write("data: " + `Event stream ${i} \n\n`);
    i++;
     setTimeout(_ => sendEventStreams(res), 1000)
}

/*
    emits an event everytime new data is added in the database
*/

emitEventOnNewDataAdded();

function emitEventOnNewDataAdded() {

    event.emit("newDataAdded", "new data")

    // demo of data insertion in database every 1.5 seconds
    setTimeout(emitEventOnNewDataAdded, 1500)
}

app.listen(process.env.port || 9000 , () => {
    console.log("listening in port 9000")
})