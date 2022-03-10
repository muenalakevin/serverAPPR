const { httpError } = require("../helpers/handleError");
const smtpModel = require("../models/smtp");
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const usuarioModel = require("../models/usuario");
var CodeGenerator = require('node-code-generator');


const getItem = async (req, res) => {
    try {
        let smtp = await smtpModel.findOne();
        if(smtp!=undefined){
            res.send(smtp);
        }else{
            smtp = await smtpModel.create({
              servidor:'smtp.gmail.com',
              usuario:'',
              contrasenia:'',
              puerto:'465 ',
            });
            res.send(smtp);
        }
      } catch (e) {
        httpError(res, e);
      }
};


const updateItem = async (req, res) => {
  try {

    const {
        servidor,
        usuario,
        contrasenia,
        puerto
    } = req.body.smtp;
    let resDetail


     resDetail = await smtpModel.findOneAndUpdate(
      { },
      { servidor,
        usuario,
        contrasenia,
        puerto},
    );
    res.send(resDetail);
} catch (e) {
    httpError(res, e);
  }
};
const test = async (req, res) => {
    try{
    const {
        servidor,
        usuario,
        contrasenia,
        puerto
    } = req.body.smtp;

    let transporter = nodemailer.createTransport({
        host: servidor,
        port: puerto,
        secure: true, 
        auth: {
            user: usuario,
            pass: contrasenia
        }
   });
/*    const transporter = nodemailer.createTransport(transport) */
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
        //if error happened code ends here
        res.sendStatus(403)
    } else {
        //this means success
        res.send(servidor);
    }

})

  } catch (e) {
    httpError(res, e);
  }
};



const resetPassword = async (req, res) => {
    // let host = '3.23.157.27:4200'
    let host = '3.23.157.27';
    try{
    const {
        email
    } = req.body;
    let smtp = await smtpModel.findOne();

    let transporter = nodemailer.createTransport({
        host: smtp.servidor,
        port: smtp.puerto,
        secure: true, 
        auth: {
            user: smtp.usuario,
            pass: smtp.contrasenia
        }
   });
   let user = await usuarioModel.findOne({correo_usuario:email})
/*    const transporter = nodemailer.createTransport(transport) */

if(user!=null){
    var generator = new CodeGenerator();
var pattern = 'ABC#+';
var howMany = 100;
var options = {};
// Generate an array of random unique codes according to the provided pattern:
var codes = generator.generateCodes(pattern, howMany, options);
let codeRecovery = ''
for (let i = 0; i < codes.length; i++) {
     codeRecovery  += codes[i];
    
}

user = await usuarioModel.findOneAndUpdate({_id:user._id},{codeRecovery})
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
        //if error happened code ends here
        res.sendStatus(403)
    } else {
        //this means success
        console.log(smtp);
        console.log(req.body);
        const mail = {
            from: smtp.usuario,
            to: email,
            subject: 'Restablecer contraseña',
            html: `
            <!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title></title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    table, td, div, h1, p {font-family: Arial, sans-serif;}
  </style>
</head>
<body style="margin:0;padding:0;">
  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
          <tr>
            <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">
                <h1>Restablecer contraseña</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 30px 42px 30px;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                <tr>
                  <td style="padding:0 0 36px 0;color:#153643;">
                    <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Sigue los pasos</h1>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">1. Ingresa a la siguiente página.</p>
                   <a href="http://${host}/auth/resetPassowrd?k=${codeRecovery}">
                       <button 
                       style=" background-color: #153643;color: white; padding: 25px 50px;"
                       ><b>Restablecer contraseña</b></button>
                   </a><br>
                   <a 
                   style="font-size: 10px;"
                   href="http://${host}/auth/resetPassowrd?k=${codeRecovery}">
                    http://${host}/auth/resetPassowrd?k=${codeRecovery}</a>
                    <br>   <br>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">2. Restablece tu contraseña.</p>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">3. Ingresa al sistema.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:30px;background:#ee4c50;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                <tr>
                  <td style="padding:0;width:50%;" align="left">
                    <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                     APPR 2022<br/><a href="http://${host}" style="color:#ffffff;text-decoration:underline;"></a>
                    </p>
                  </td>
                  <td style="padding:0;width:50%;" align="right">
                    <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
            `,
            }
            transporter.sendMail(mail, (err, data) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(403)
                } else {
                    res.json({
                        status: 'success',
                    })
                }
            })
    }

})



}else{
    res.sendStatus(404)
}
  } catch (e) {
    httpError(res, e);
  }
};



module.exports = { getItem, updateItem,test,resetPassword };
