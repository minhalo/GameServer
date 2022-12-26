import nodemailer from 'nodemailer'

let mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        user: 'duongdoican@gmail.com',
        pass: 'ihfmabzjhzztceyf'
    }
})


exports.loginMail = (gmail, name, age) => {
    let detail = {
        from: 'duongdoican@gmail.com',
        to: gmail,
        subject: 'Blindex activated account',
        html: `
        <div
        style="width:500px; height: 250px; margin-top: 10px; margin-left: 10px; padding: 10px 10px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; border-radius: 5px 5px;">
        <h1 style="margin: 0; color: red">Hi, ${name}</h1>
        <div style="margin-bottom: 10px">
            Please click on button to activate your account
        </div>
        <a  href="https://localhost:8500/auth/activated/${gmail}"
            style="border: 1px solid pink; padding: 5px 10px; border-radius: 5px 5px; color: blue; background-color: pink; cursor: pointer;">&#8376;
            Activated
            here</a>
        </div>
        `
    }

    mailTransport.sendMail(detail, (err) => {
        if (err) { console.log(err) }
        else { console.log("email has sent"); }
    })
}