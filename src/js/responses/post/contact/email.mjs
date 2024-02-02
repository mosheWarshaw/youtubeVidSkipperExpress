import nodemailer from "nodemailer";
export {sendEmail};

/*Create a class out of this and separate
the transporter and mailOptions into being
defined outside the method, and have the server
createa an object of it and export it.*/
async function sendEmail(emailBody){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "",
        text: emailBody
    };

    await transporter.sendMail(mailOptions);
}