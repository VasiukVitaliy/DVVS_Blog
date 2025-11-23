import express, { urlencoded } from "express";
import { writeMessage,  deleteMessage, updateMessage, readAll} from "./crud_message.js";
import { login, registration } from "./log_reg.js";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/writeMessage", writeMessage)
app.delete("/deleteMessage", deleteMessage)
app.put("/updateMessage", updateMessage)
app.get("/readAll", readAll)

app.post("/reg", upload.single("avatar"), registration)
app.post("/login", login)

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});