const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (_,res) => res.sendFile("/index.html"));

let i = 0 ;

app.get("/streams", (req,res) => {
    res.setHeader("Content-Type", "text/event-stream");
    sendEventStreams(res);
})

function sendEventStreams(res) {
    res.write("data: " + `Event stream ${i} \n\n`);
     setTimeout(_ => sendEventStreams(res), 1000)
}

app.listen(process.env.port || 9000 , () => {
    console.log("listening in port 9000")
})