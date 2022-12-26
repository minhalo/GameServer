import httpGet from '../httpRequest/get'
import fs from 'fs'

exports.testCaseA = async (req, res) => {
    let data = await httpGet.get("https://localhost:8500/auth/test")
    return res.status(200).json(data);
}

exports.testCaseB = async (req, res) => {
    let img = "male.png"
    fs.readFile(process.env.AVATAR_PATH + img, function (err, content) {
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

exports.testCaseC = async (req, res) => {
    let rawData = req.body.raw;
    fs.writeFile("/home/minh/Documents/GameServerConfig/GameServer/src/assets/testFile/ok.png", rawData, 'base64', (err, data) => { })
    res.status(200).json(true)
}