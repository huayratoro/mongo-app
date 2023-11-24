import net from "node:net";
import dotenv from "dotenv";
import { writeHistory } from "../utils/handle-history.js";
import { randomUUID } from "node:crypto";
dotenv.config();

let port = process.env.PORT ?? 2323;    // ?? por las dudas no carga el .env

const serverTCP = net.createServer();

serverTCP.on("connection", (socket) => {
    
    let globalId = randomUUID();
    
    socket.on("data", (dataBfr) => {
        const data = JSON.parse(dataBfr.toString());
        console.log(data)
    });
    
    socket.on("close", () => {
        console.log("Client disconnected")
        writeHistory("disconnect", {id: globalId, date:new Date().toLocaleString()})
    });
    
    socket.on("error", () => {
        console.log("Client error")
    });
    
    console.log("Client connected - ", new Date().toLocaleString());
    writeHistory("connect", {id: globalId, date:new Date().toLocaleString()})
});

serverTCP.listen(port, () => {
    console.log("Server is listen in port ", port)
});


