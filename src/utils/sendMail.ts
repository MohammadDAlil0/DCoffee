import nodemailer from 'nodemailer';

const sendMail = async (options: {
    email: string,
    subject: string,
    message: any
}) => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.TEAM_EMAIL,
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.NODE_MAILER_EMAIL,
            pass: process.env.NODE_MAILER_PASSWORD
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: `${process.env.TEAM_NAME} <${process.env.TEAM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: options.message
    };
    await transporter.sendMail(mailOptions);
}

export default sendMail;