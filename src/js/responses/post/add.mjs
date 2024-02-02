import {SqlInjection} from "../../general/sqlInjection.mjs";
import {conn} from "../../../server.mjs";

export {checkAddForSqlInjection, insertVideo, insertSeconds, postAdd};

function checkAddForSqlInjection(req, res, next){
    const title = req.body.title.trim();
    const videoId = req.body.videoId.trim();
    const isSqlInjection = SqlInjection.keywordCheck([title, videoId]);
    if(isSqlInjection){
        res.send(`
            <div id="responseText">
                Don't inlcude any of the following in your input: TABLE DATABASE GRANT REVOKE COMMIT ROLLBACK SAVEPOINT USE SHOW DESCRIBE DESC
            </div>
        `);
    }
    else{
        next();
    }
}



async function insertVideo(req, res, next){
    const userId = req.session.userId;
    const title = req.body.title.trim();
    const videoId = req.body.videoId.trim();
    /*I would use a template string but then the value
    appears with the new lines in the debugger.*/
    const queryStr = "" +
        "INSERT INTO Video " +
        "(user_id, title, video_id) " +
        "VALUES (" + 
        "'" + userId + "'," +
        "'" + title + "'," +
        "'" + videoId + "'" +
        ")"
    ;
    await (conn.promise().query(queryStr));
    next();
}



async function insertSeconds(req, res, next){
    const queryStr = getSecondsQuery(req.session.userId, req.body);
    await (conn.promise().query(queryStr));
    next();
}

function getSecondsQuery(userId, reqBody){
    const title = reqBody.title.trim();
    let queryStr = "" +
        "INSERT INTO Skip " +
        "(user_id, title, start, end) " +
        "VALUES ";
    let start;
    let end;
    let isNotLastPair;
    const numOfPairs = parseInt(reqBody.numOfPairs);
    for(let i = 1; i <= numOfPairs; i++){
        //Parsing to an int is the sql sanitization here.
        start = parseInt(reqBody["start" + i]);
        end = parseInt(reqBody["end" + i]);
        queryStr += "" +
            "(" +
            "'" + userId + "'," +
            "'" + title + "'," +
            "'" + start + "'," +
            "'" + end + "'" +
            ")"
        ;
        isNotLastPair = i !== numOfPairs;
        if(isNotLastPair){
            queryStr += ",";
        }
    }
    return queryStr;
}



function postAdd(req, res){
    res.send(`
        <div id="responseText">
            Successful addition.
        </div>
    `);
}