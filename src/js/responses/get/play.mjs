import {compiledPlayFunc} from "../..//general/compilePug.mjs";
import {conn} from "../../../server.mjs";
export {getPlay};

async function getPlay(req, res){
    const queryStr = "" +
        "SELECT video_id, title " + 
        "FROM Video " +
        "WHERE user_id='" + req.session.userId + "'";
    const [rows] = await (conn.promise().query(queryStr));
    const buttons = getButtons(rows);
    res.send(compiledPlayFunc({buttons}));
}

function getButtons(rows){
    let row;
    let videoId;
    let title;
    let htmlStr = "";
    for(let i = 0; i < rows.length; i++){
        row = rows[i];
        videoId = row["video_id"];
        title = row["title"];
        htmlStr += "" +
            "<div class='buttonDiv'>" +
                "<button id='" + videoId + "'>" +
                    title +
                "</button>" +
            "</div>"
        ;
    }
    return htmlStr;
}