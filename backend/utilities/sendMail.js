const nodemailer = require('nodemailer')

const sendMailFunc =  async ( options )=> {

  const transporter = nodemailer.createTransport({

    service: process.env.EMAIL_SERVICE,

     auth: {
        user: process.env.EMAIL_USER,
        password: process.env.USER_PASSWORD
     },

     
    })
    
         const mailOptions = {
            from: process.env.EMAIL_USER,
            to: options.to,
            subject: options.subject,
            html: options.text
         }

    transporter.sendMail(mailOptions, (err, info)=> {
       if(err){
       console.log('error in sending')
       }
       if(info){
       console.log('message in sending')
       }
    })

}



module.exports = { sendMailFunc }