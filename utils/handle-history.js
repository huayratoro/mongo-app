import { randomUUID } from "node:crypto";
import fs from "node:fs"

const PATH = "./log/historyUser.json"

const readHistory = () => {
    return JSON.parse(fs.readFileSync(PATH).toString());
};

const writeHistory = (state, obj) => {
    const data = readHistory();
    if (state === "connect") {
        data.userConnection.push(obj)
    } else {
        data.userDisconnection.push(obj)
    }
    const jsonObject = JSON.stringify(data);
    fs.writeFileSync(PATH, jsonObject)
};

export { readHistory, writeHistory }