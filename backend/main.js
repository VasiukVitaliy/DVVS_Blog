import express, { urlencoded } from "express";
import { writeMessage,  deleteMessage, updateMessage, readAll} from "./crud_message.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/writeMessage", writeMessage)
app.delete("/deleteMessage", deleteMessage)
app.put("/updateMessage", updateMessage)
app.get("/readAll", readAll)

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});