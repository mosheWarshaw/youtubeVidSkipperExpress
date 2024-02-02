import {conn} from "../../../server.mjs";
import {SqlInjection} from "../../general/sqlInjection.mjs";

export {checkPlayForSqlInjection, postPlay};

function checkPlayForSqlInjection(req, res, next){
    const title = req.body.title.trim();
    const isSqlInjection = SqlInjection.keywordCheck(title);
    if(isSqlInjection){
        res.send("err");
    }
    else{
        next();
    }
}


async function postPlay(req, res){
    const userId = req.session.userId;
    const title = req.body.title;
    const queryStr = "" +
        "SELECT start, end " +
        "FROM Skip " +
        "WHERE user_id =" + userId + " " +
        "AND title ='" + title + "'";
    const result = await (conn.promise().query(queryStr));
    const rows = result[0];
    res.json(rows);
}