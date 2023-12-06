import nodemailer from "nodemailer";
// transporter configurations

export let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  service: "gmail",
  auth: {
    user: "ahmed1999khalafallah@gmail.com",
    pass: "ihjqhwwwaqxwrecr",
  },
});

// create options
export const options = (email, msg) => {
  return {
    from: process.env.EMAIL,
    to: email,
    subject: "Chatty registration",
    // text: msg,
    html: HTML_TEMPLATE(msg),
  };
};
// email style & templete
export const HTML_TEMPLATE = (text) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NodeMailer Email Template</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .email-header {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email">
              <div class="email-header">
                <h1>EMAIL HEADER</h1>
              </div>
              <div class="email-body">
                <p>${text}</p>
              </div>
              <div class="email-footer">
                <p>EMAIL FOOTER</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
};

// send email
export const sendMail = async (mailDetails, cb) => {
  try {
    const info = await transporter.sendMail(mailDetails);
    cb(info);
  } catch (error) {
    console.log(error);
  }
};
