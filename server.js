const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const colors = require("colors");
const applyNow = require("./public/models/applyNow");
const enquireNow = require("./public/models/enquireNow");
const nodemailer = require("nodemailer");

dotenv.config();
const app = express();
const staticpath = path.join(__dirname, "./public");
app.use(bodyParser.json());
app.use(express.static(staticpath));
app.use(
  express.urlencoded({
    extended: false,
  })
);

//connectDb
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

connectDB();

app.post("/applyNow", async (req, res) => {
  try {
    const applyNowData = new applyNow(req.body);
    const applySuccess = await applyNowData.save();
    if (applySuccess) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.EMAILUSER,
          pass: process.env.EMAILPASSWORD,
        },
      });

      const mailOptions = {
        from: '"Digitech Cache" <digitechcache90@gmail.com>',
        to: applyNowData.email,
        subject: "Your Application",
        html: `<h4 style="font-size: 15px;">Hi ${applyNowData.firstName},</h4><br> <h5 style="font-size: 13px;">Thank you for submitting your application. We appreciate your interest in our company and the position you have applied for. Our team will carefully review your application and qualifications.

        We understand the importance of this opportunity to you, and we assure you that we will give your application the attention it deserves.
        
        Please note that due to the high volume of applications we receive, it may take some time to process and evaluate each one thoroughly. We kindly request your patience during this process.
        
        If your qualifications match our requirements, we will reach out to you for the next steps, which may include interviews or additional assessments.
        
        Once again, thank you for choosing to apply with us. We wish you the best of luck in your job search. </h5>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Mail has been sent:- ", info.response);
        }
      });
    }
    res.status(201).redirect("success/success.html");
  } catch (e) {
    console.log(e.message);
    res.status(500).redirect("error/error.html");
  }
});

app.post("/enquireNow", async (req, res) => {
  try {
    const enquireNowData = new enquireNow(req.body);
    const enquireSuccess = await enquireNowData.save();
    console.log(enquireNowData);
    if (enquireSuccess) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.EMAILUSER,
          pass: process.env.EMAILPASSWORD,
        },
      });

      const mailOptions = {
        from: '"Digitech Cache" <digitechcache90@gmail.com>',
        to: enquireSuccess.email,
        subject: "For Enquire",
        html: `<h4 style="font-size: 15px;">Hi ${enquireNowData.name},</h4><br> <h5 style="font-size: 13px;">Thank you for reaching out to us through the Enquiry Now form. We appreciate your interest in our audit services. Our team is dedicated to providing comprehensive and reliable solutions that strengthen financial integrity and ensure compliance.

                We have received your inquiry and will review it promptly. One of our knowledgeable representatives will be in touch with you shortly to discuss your specific requirements and provide further assistance.
                
                In the meantime, feel free to explore our website for more information about our audit services and the value we bring to our clients. We look forward to the opportunity to serve you and address your auditing needs.
                
                Thank you once again for choosing our audit services. </h5>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Mail has been sent:- ", info.response);
        }
      });
    }
    res.status(201).redirect("success/success.html");
  } catch (e) {
    res.status(500).redirect("error/error.html");
  }
});

app
  .get("/", (req, res) => {
    res.set({
      "Allow-access-Allow-Origin": "*",
    });
    return res.redirect("index.html");
  })
  .listen(3000);

console.log("Listening on PORT 3000");
