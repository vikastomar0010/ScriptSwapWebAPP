import {fileURLToPath} from 'url'
import {dirname,join } from 'path'
import fs from 'fs'
import axios from 'axios'

const sendGeminiRequest=async(datas,selectedLanguage)=>{
   try {
     const response= await axios({
         url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDxGMgt_VzZM0-AP1HjVkug8W9no1Ik9O4",
         method: "post",
         data: {
           contents: [
             {
               parts: [
                 {
                   text: `${datas} convert this code into ${selectedLanguage} code kindly return only code part no extra information just the code`,
                 },
               ],
             },
           ],
         },
     })
     let convertedCode = response.data.candidates[0].content.parts[0].text;
       convertedCode = convertedCode.replace(/```[\s\S]*?```/g, (match) =>
         match.replace(/```.*?\n/, "").replace(/\n```/, "")
     );
     return convertedCode
   } catch (error) {
      console.log(error+"here while sending the gemini Ai api request")
   }
}
const sendFile=async(req,res)=>{
    const {datas,filen,selectedLanguage}=req.body
    if(!datas){
        return res.status(400).json({msg:'Data not found in request'})
    }
    if(!filen){
        return res.status(400).json({msg:'filen not found in request'})
    }
    const content = await sendGeminiRequest(datas,selectedLanguage);
    const fileName = filen;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, fileName);

    // Creating file temporarily
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.log('Error occurred while creating file:', err);
            return res.status(500).json({ msg: 'Error occurred while creating the file' });
        }

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

        // Send file
        res.sendFile(filePath, (err) => {
            if (err) {
                console.log('Error while sending the file:', err);
                return res.status(500).json({ msg: 'Error while sending the file' });
            }

            // Clean up file after sending
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log('Error while unlinking the file:', err);
                }
            });
        });
    });
}

export {sendFile}