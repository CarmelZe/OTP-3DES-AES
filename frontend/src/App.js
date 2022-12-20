import './App.css';
import {useState} from "react";
import axios from "axios";
export default App;

function App() {
 const [key , setKey] = useState("");
 const [message , setMessage] = useState("");
 const [outEnc , setOutEnc] = useState("");
 const [encKey, setEncKey] = useState("")

 const [keyDec , setKeyDec] = useState("");
 const [messageDec , setMessageDec] = useState("");
 const [outDec , setOutDec] = useState("");

 const [option , setOption] = useState("OTP");


 let Encrypt =  async ()=>{
    if(option === "3DES") {
        let response = await axios.post("http://127.0.0.1:5000/3DES_ENC" , {key , message});
        setOutEnc(response.data.encryptedData)
    } else if(option === "AES") {
        let response = await axios.post("http://127.0.0.1:5000/AES_ENC" , {key , message});
        setOutEnc(response.data.encryptedData)
    } else if(option === "OTP") {
        let response = await axios.post("http://127.0.0.1:5000/OTP_ENC" , {key , message});
        setOutEnc(response.data.encryptedData)
    }
    
 }

 let Decrypt = async () =>{
    if(option === "3DES") {
        let response = await axios.post("http://127.0.0.1:5000/3DES_DEC" , {key:keyDec , encryptedData:messageDec });
        setOutDec(response.data.decryptedData)
    } else if(option === "AES") {
        let response = await axios.post("http://127.0.0.1:5000/AES_DEC" , {key:keyDec , encryptedData:messageDec });
        setOutDec(response.data.decryptedData)
    } else if(option === "OTP") {
        let response = await axios.post("http://127.0.0.1:5000/OTP_DEC" , {key: keyDec , encryptedData: messageDec});
        setOutDec(response.data.decryptedData)
 }
 }




  return (
    <div className="App">
        <div className="choice">
        <label for="Algorithm">Choose Algorithm:</label>
            <select className="Algorithm" id="Algorithm" value={option} onChange={(e)=> setOption(e.target.value)}>
                <option value="OTP">OTP</option>
                <option value="3DES">3DES</option>
                <option value="AES">AES</option>
            </select>
        </div>

        <div className="Encrypt">
        <div> 
            <p3 className="message1" id="msg1">Message to Encrypt: </p3> 
            <textarea id="msg" value={message} onChange={(e)=>setMessage(e.target.value)} ></textarea>
        </div>

        <div> 
            <p3 className="message1">Encryption Key: </p3>
            <input type="text" id="key" value={key} onChange={ (e)=> setKey(e.target.value)} /> 
        </div>

        <div >
            <button id="enc" onClick={Encrypt}>Encrypt</button>
            <button id="copEnc" onClick={()=> setMessageDec(outEnc)}>Copy Encryption</button>
        </div>

        <div>
            <textarea id="output" value={outEnc} onChange={(e)=> setOutEnc(e.target.value)}> </textarea>
        </div>
        </div>
        <div className="Decrypt">
        <div> 
            <p3 className="message1">Message to Decrypt: </p3> 
            <textarea  id="msgDec" value={messageDec} onChange={(e)=> setMessageDec(e.target.value) }></textarea>
        </div>

        <div> 
            <p3 className="message1">Decryption Key: </p3>
            <input type="text" id="keyDec" value={keyDec} onChange={(e)=> setKeyDec(e.target.value)} /> 
        </div>

        <div>
            <button id="dec" onClick={Decrypt}>Decrypt</button>
            <button id="copDec">Copy Decryption</button>
        </div>

        <div>
            <textarea id="outputDec" value={outDec} onChange={(e)=> setOutDec(e.target.value)}></textarea>
        </div>
        </div>

    
    </div>
  );
}