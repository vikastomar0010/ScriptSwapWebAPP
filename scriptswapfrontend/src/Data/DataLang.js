import { FaPython, FaJsSquare, FaJava, FaCode } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { SiTypescript } from "react-icons/si";
import { FaGolang, FaRust } from "react-icons/fa6"
const lang = [
   
    {
      name: "Python",
      icon: <FaPython className="text-6xl text-blue-500 mr-2" />,
      extension: ".py",
    },
    {
      name: "JavaScript",
      icon: <FaJsSquare className="text-6xl text-yellow-500 mr-2" />,
      extension: ".js",
    },
    {
      name: "Java",
      icon: <FaJava className="text-6xl text-red-500 mr-2" />,
      extension: ".java",
    },
    {
      name: "Cpp",
      icon: <SiCplusplus className="text-6xl text-blue-700 mr-2" />,
      extension: ".cpp",
    },
    {
      name: "GO",
      icon: <FaGolang color="#29BEB0" className="text-6xl text-blue-700 mr-2" />,
      extension: ".go",
    },
    {
      name: "Rust",
      icon: <FaRust className="text-6xl text-black mr-2" />,
      extension: ".rs",
    },
    {
      name: "C",
      icon: <FaCode className="text-6xl text-gray-700 mr-2" />,
      extension: ".c",
    },
    {
      name: "Csharp",
      icon: (
        <TbBrandCSharp
          color="#007acc"
          className="text-6xl text-blue-600-700 mr-2"
        />
      ),
      extension: ".cs",
    },
    {
      name: "TypeScript",
      icon: (
        <SiTypescript
          color="#007acc"
          className="text-6xl text-blue-500-700 mr-2"
        />
      ),
      extension: ".ts",
    },
  ];

  ;


  export {lang}