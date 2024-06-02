const PORT = process.env.PORT || 3008

const express = require("express")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post("/send-email", async (req, res) => {
   let transporter = nodemailer.createTransport({
      service: "Outlook365",
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS,
      },
      tls: {
         ciphers: "SSLv3",
         rejectUnauthorized: false,
      },
   })

   let mailOptions = {
      from: process.env.SMTP_FROm,
      to: process.env.SMTP_TO,
      subject: `Message from ${req.body.name} (${req.body.email})`,
      html: `<div>
            <p>
               <strong>req.body.contact</strong>
            </p>
            <br />
            <p>req.body.comments</p>
         </div>`,
   }

   let result = await transporter.sendMail(mailOptions)
   console.log(result)
   res.send(result)
})

app.listen(PORT, (error) => {
   if (!error) {
      console.log(`Server is running on port ${PORT}`)
   } else {
      console.log("Error occurred, server can't start", error)
   }
})
