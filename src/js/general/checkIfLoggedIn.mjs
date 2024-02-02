import {compiledRedirectMessage} from "./compilePug.mjs";
export {checkIfLoggedIn};

function checkIfLoggedIn(req, res, next){
    if(req.session.loggedIn){
        next();
    }
    else{
        res.send(compiledRedirectMessage);
    }
}