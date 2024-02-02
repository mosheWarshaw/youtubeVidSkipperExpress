import {Credentials} from "./credentials.mjs";
export {postAccount};

async function postAccount(req, res){
    const credentialsType = req.body.credentialsType;
    const username = req.body.username;
    const password = req.body.password;
    const result = await ((new Credentials()).main(credentialsType, username, password));
    if(result.userId !== null){
        req.session.userId = result.userId;
        req.session.loggedIn = true;
    }
    res.send(`
        <div id="formSubmissionResponse">
            ${result.response}
        </div>
    `);
}