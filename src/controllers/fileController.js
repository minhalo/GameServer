import fileService from "../services/fileService"
import fs from 'fs'

exports.avatarDefault = async (req, res) => {
    let gender = req.params.gender;
    if (gender && (gender == 'male' || gender == 'female')) {
        fs.readFile(process.env.AVATAR_PATH + `${gender}.png`, function (err, content) {
            if (err) {
                res.writeHead(400, { 'Content-type': 'text/html' })
                console.log(err);
                res.end("No such image");
            } else {
                //specify the content type in the response will be an image
                res.writeHead(200, { 'Content-type': 'image/png' });
                res.end(content);
            }
        });
    }
    else {
        res.send("No such image");
    }

}
