import express from "express";
import DES from "node_triple_des";
import Crypto from "crypto-js";
import cors from "cors";
import otp from "@bpe/one-time-pad";

const {OneTimePad} = otp;

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/3DES_ENC' , (req , res)=>{
     let message = req.body.message;
     let key = req.body.key;

     const encrypt =  DES.encrypt(key, message);
     res.status(200);
     res.json({encryptedData: encrypt })
})

app.post('/3DES_DEC' , (req , res)=> {
    let encryptedData = req.body.encryptedData;
    let key = req.body.key;

    const decryptedData =  DES.decrypt(key, encryptedData);
    res.status(200)
    res.json({decryptedData});    
})

app.post("/AES_ENC" , (req , res)=> {
    let message = req.body.message;
    let key = req.body.key;
    let encryptedData = Crypto.AES.encrypt(message, key).toString();

    res.status(200);
    res.json({encryptedData })
})

app.post("/AES_DEC" , (req , res)=> {
    let encryptedData = req.body.encryptedData;
    let key = req.body.key;

    let bytes  = Crypto.AES.decrypt(encryptedData, key );
    let decryptedData = bytes.toString(Crypto.enc.Utf8);

    res.status(200)
    res.json({decryptedData}); 
})

let key = "";
let encKey = "";
const stringToInt = s => Uint8Array.from(atob(s), d => d.charCodeAt(0));

app.post('/OTP_ENC' , (req , res)=>{
  const pTB = Buffer.from(req.body.message, "utf8");
  key = req.body.key;
  encKey = OneTimePad.generatePad(req.body.key);

  const encrypted = OneTimePad.encrypt(encKey, pTB);
  return res.status(200).json({encryptedData: Buffer.from(encrypted).toString("base64")});
})


app.post('/OTP_DEC' , (req , res)=>{
  if (key !== req.body.key) return res.status(200).json({decrypted: ""});
    const decrypted = OneTimePad.decrypt(encKey, stringToInt(req.body.encryptedData));
    return res.status(200).json({decryptedData: Buffer.from(decrypted).toString("utf8")});
})



app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})


