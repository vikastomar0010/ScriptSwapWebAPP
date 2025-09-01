import axios from "axios";
import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { lang } from "./Data/DataLang";
import Contact from "./components/Contact";
const languages = lang;

function App() {
  const [datas, setdatas] = useState("");
  const [datar, setdatar] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [youlang, setlang] = useState(languages[2]);
  const [loading, setloading] = useState(false);
  const [warning, setWarning] = useState("");
  const [copy, setcopy] = useState(false);
  const [filecontent, setfilecontent] = useState("");
  const [downloadurl, setdownloadurl] = useState("");
  const [fileName, setfileName] = useState("");
  const [fileloading, setfileloading] = useState(false);
  const [Downloadclick, setDownloadclick] = useState(false);
  const api_key = process.env.REACT_APP_GEMINI_KEY;
  const btnStyle =
    "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 transform hover:scale-105 transition-transform duration-300";

  const RequestSender = async () => {
    if (!datas.trim()) {
      setWarning("Please enter some code to convert.");
      return;
    }
    setWarning("");
    try {
      setloading(true);
      console.log(api_key)
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${api_key}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `${datas} convert this code into ${selectedLanguage.name} code kindly return only code part no extra information just the code`,
                },
              ],
            },
          ],
        },
      });
      let convertedCode = response.data.candidates[0].content.parts[0].text;
      convertedCode = convertedCode.replace(/```[\s\S]*?```/g, (match) =>
        match.replace(/```.*?\n/, "").replace(/\n```/, "")
      );
      setdatar(convertedCode);
      setloading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(datar);
    setcopy(true);
    setTimeout(() => {
      setcopy(false);
    }, 2000);
  };

  const ReadFileData = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const nameWithoutExtension = file.name.split(".").slice(0, -1).join("."); // Extract file name without extension
      setfileName(nameWithoutExtension);
      const reader = new FileReader();
      reader.onload = (ed) => {
        setfilecontent(ed.target.result);
      };
      reader.readAsText(file);
    }
  };

  const FileBackendRequest = async () => {
    if (!filecontent) {
      setWarning("Please enter some code file to convert");
      return;
    }
    setWarning("");
    try {
      setfileloading(true);
      const response = await axios.post(
        "https://scriptswapbackend.onrender.com/api/v1/file/downloadfile",
        {
          datas: filecontent,
          filen: fileName + selectedLanguage.extension,
          selectedLanguage: selectedLanguage.name,
        }
      );

      // creating url to download it
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setdownloadurl(url);
      setfileloading(false);
    } catch (error) {
      console.log("Error during file conversion:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold text-center text-white mb-4">
        ScriptSwap
      </h1>
      <p
        className="text-lg text-center text-white mb-4 mx-8 p-4 rounded-lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          color: "#f3f4f6",
          lineHeight: "1.5rem",
        }}
      >
        Effortlessly convert your code between various programming languages
        with our advanced code converter. Perfect for transitioning projects or
        learning new languages, our tool ensures a smooth and efficient
        conversion process.
      </p>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl">
        {warning && (
          <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white p-1 rounded-lg text-center">
            {warning}
          </div>
        )}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex flex-col">
            <p className="font-semibold text-xl text-blue-400">Code language</p>
          <div className="flex items-center mb-4 sm:mb-0">
            {youlang.icon}
            <select
              className="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow focus:outline-none ml-2"
              value={youlang.name}
              onChange={(e) =>
                setlang(languages.find((lang) => lang.name === e.target.value))
              }
            >
              {languages.map((lang) => (
                <option key={lang.name} value={lang.name}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-xl text-pink-400">Output Code</p>
          <div className="flex items-center">
            {selectedLanguage.icon}
            <select
              className="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow focus:outline-none ml-2"
              value={selectedLanguage.name}
              onChange={(e) =>
                setSelectedLanguage(
                  languages.find((lang) => lang.name === e.target.value)
                )
              }
            >
              {languages.map((lang) => (
                <option key={lang.name} value={lang.name}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <div className="flex flex-col sm:flex-row gap-y-4 gap-x-4">
            <input
              className="block w-full sm:w-72 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              accept={youlang.extension}
              onChange={ReadFileData}
            />
            <button
              className={btnStyle}
              style={{ maxWidth: "10rem" }}
              onClick={FileBackendRequest}
            >
              {fileloading ? "Converting File" : "Convert File"}
            </button>
            {downloadurl && (
              <a
                onClick={() => {
                  setDownloadclick(true);
                  setTimeout(() => {
                    setDownloadclick(false);
                  }, 1500);
                  setTimeout(() => {
                    setdownloadurl("");
                  }, 1500);
                }}
                href={downloadurl}
                download={`ScriptSwap${fileName + selectedLanguage.extension}`}
                className={btnStyle}
                style={{ maxWidth: "10rem" }}
              >
                {Downloadclick ? "Downloaded ✓" : "Download File"}
              </a>
            )}
          </div>
          <label
            className="block mt-4 mb-2 text-sm font-medium text-gray-900"
            htmlFor="file_input"
          >
            Enter code
          </label>
        </div>
        <div className="flex flex-col md:flex-row mb-4">
          <div className="w-full md:w-1/2 pr-0 md:pr-2 mb-4 md:mb-0">
            <div className="bg-gray-100 border-2 border-solid border-gray-400 rounded-lg h-72">
              <Editor
                height="100%"
                defaultLanguage={youlang.name.toLowerCase()}
                language={youlang.name.toLowerCase()}
                theme="vs-dark"
                value={datas}
                onChange={(value) => setdatas(value)}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: "off",
                }}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-2">
            <div className="bg-gray-100 border-2 border-solid border-gray-400 rounded-lg h-72">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                language={selectedLanguage.name.toLowerCase()}
                theme="vs-dark"
                value={datar}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: "off",
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className={btnStyle}
            onClick={RequestSender}
            style={{ maxWidth: "10rem" }}
          >
            {loading ? "Converting" : "Convert Code"}
          </button>
          {datar && (
            <button
              className={btnStyle}
              onClick={handleCopy}
              style={{ maxWidth: "10rem" }}
            >
              {copy ? "Copied ✓" : "Copy Output"}
            </button>
          )}
        </div>
      </div>
      <Contact />
    </div>
  );
}

export default App;
