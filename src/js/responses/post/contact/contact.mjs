import {sendEmail} from "./email.mjs";
export {postContact};

function postContact(req, res){
    const emailBody = req.body.emailBody;
    sendEmail(emailBody);
    res.send(`
        <div id="formSubmissionResponse">Message sent successfuly.</div>";
    `);
}