// firebase config
const serviceAccount = require("../permissions.json");
const firebase = require("firebase-admin");

// Initialize the Firebase app
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://weddingbot-1e2cb-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = firebase.database();

const fs = require('fs');
const { Client, MessageMedia } = require('whatsapp-web.js');
const clientsArray = {};

const BotAPI = async (req, res) => {
    try {
        const { method } = req;
        switch (method) {
            case 'GET':
                console.log('test to fetch');
                console.log('test to fetch');
                break;
            case 'POST':
                generateQRHandler(res, req);
                break;
            default:
                break;
        }
    }
    catch (e) {
        console.log(e)
        res.status(400).json({ e: e })
    }
}

const generateQRHandler = async (res, req) => {
    console.log('here', req.body);
    let sessionId = Date.now();
    let sendRes = false;
    clientsArray[sessionId] = new Client({
        puppeteer: {
            executablePath: `C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe`,
        }
    })
    clientsArray[sessionId].initialize();
    clientsArray[sessionId].on('qr', async (QR) => {
        await db.ref("connections").child((new Date()).toISOString().split('T')[0]).once("value", async (snapshot) => {
            await db.ref("connections").child((new Date()).toISOString().split('T')[0]).child(sessionId).set((sessionId + 65000) < Date.now() ? { 'QR': 'REFRESH' } : { QR })
            if ((sessionId + 65000) < Date.now()) {
                clientsArray[sessionId].destroy();
                return;
            };
            if (!sendRes) {
                res.status(200).json(sessionId)
                sendRes = true;
            };
        });
    });

    clientsArray[sessionId].on('ready', async () => {
        console.log('connected to client');
        let sentTo = [];
        try {
            await db.ref("connections").child((new Date()).toISOString().split('T')[0]).child(sessionId).set({ 'QR': 'CONNECTED' })
            // console.log("fetching image")
            // const media = await MessageMedia.fromFilePath('./weddingInvitation.png');
            console.log('Entering loop')
            // const number = "+972526552287";// const number = "+972526552287";// const number = "+972526552287";// const number = "+972526552287";// const number = "+972526552287";// const number = "+972526552287";
            for (const phoneNum of req.body.contacts) {
                await sleep(1000)
                // Getting chatId from the number.
                // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
                const chatId = '972' + phoneNum.substring(1) + "@c.us";
                console.log('sending whatsapp message to ' + phoneNum)
                if (true) { // req?.body?.media?.url

                    console.log("adding media!")
                    const media = await MessageMedia.fromFilePath('./hadar.mp4');
                    console.log("media")
                    // const media = await MessageMedia.fromUrl(req.body.media.url + '.png');
                    await clientsArray[sessionId].sendMessage(chatId, media, { caption: req.body.text })
                } else {
                    await clientsArray[sessionId].sendMessage(chatId, req.body.text)
                }
                // adding the phoneNum to sent to array
                sentTo.push(phoneNum);
            }
            console.log("finished!");
            console.log("sent to array", sentTo);
            console.log("phone number array", req.body.contacts);
        } catch (e) {
            console.log("error", e);
            console.log("sent to users ", sentTo);
        }
    });

}

const sleep = m => new Promise(r => setTimeout(r, m));
export default BotAPI;