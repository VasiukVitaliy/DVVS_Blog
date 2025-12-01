import pool from "./db.js"

async function writeMessage(req, res) {
    const { uuid, message, description } = req.body;

    if (!uuid) return res.status(401).send("Error: unauthorized user");
    if (!message) return res.status(403).send("Error: denied to send empty message");

    try {
        await pool.query(
            "INSERT INTO public.messages (user_id, message, description) VALUES ($1, $2, $3)",
            [uuid, message, description]
        );
        return res.status(201).send("Message successfully added");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Database error");
    }
}

async function deleteMessage(req, res){
    const {message_id, uuid} = req.body
    if(!message_id) res.status(400).send("Error: message doesn't exist")
    try{
        let result = await pool.query(
            "SELECT id from messages WHERE and id=$1 and user_id=$2",
            [message_id, uuid]
        )
        if (result.rowCount > 0){
            await pool.query(
            "DELETE FROM public.messages WHERE and id = $1",
            [message_id]
            )
            return res.status(200).send("Message successfully deleted");
        }
        else return res.status(400).send("Bad Request: message missing");
        
        
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Database error");
    }
}

async function updateMessage(req, res){
    const {uuid, message_id, message } = req.body
    if(!message_id) res.status(400).send("Error: message doesn't exist")
    try{
        let result = await pool.query(
            "SELECT id from messages WHERE and id=$1 and user_id=$2",
            [message_id, uuid]
        )
        if (result.rowCount > 0){
            await pool.query(
            "UPDATE messages SET message = $1 WHERE and id = $2 AND user_id = $3",
            [message, message_id, uuid]
            )
            return res.status(200).send("Message successfully updated");
        }
        else return res.status(400).send("Bad Request: message missing");  
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Database error");
    }
}

async function readAll(req, res){

    try{
        let result = await pool.query(
            "SELECT m.id, m.message, m.created_at, u.uuid, u.nick, u.avatar FROM messages m JOIN users u ON m.user_id = u.uuid ORDER BY m.created_at DESC"
        )
        res.status(200).send(result.rows)
    }catch(err){
        console.error(err);
        return res.status(500).send("Database error");
    }
}

async function readInfoMessage(req, res){
    const {id} = req.params
    try{
        let result = await pool.query(
            "SELECT m.id, m.message, m.created_at, m.description, u.uuid, u.nick, u.avatar FROM messages m JOIN users u ON m.user_id = u.uuid WHERE m.id=$1",
            [id]
        )
       res.status(200).send(result.rows)
    }catch(err){
        console.error(err);
        return res.status(500).send("Database error");
    }
}

export {writeMessage, deleteMessage, updateMessage, readAll, readInfoMessage};

