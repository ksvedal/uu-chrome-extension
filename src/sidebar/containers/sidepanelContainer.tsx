import { useEffect, useState } from "react";
import { JsonDataFormat } from "../../interfaces/resultInterfaces";
import { Sidepanel } from "../components/sidepanel";
import React from "react";
import { ElementType } from "../../interfaces/elementInterfaces";
import { createRoot } from "react-dom/client";


export const SidepanelContainer: React.FC = () => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [darkMode, setDarkMode] = useState(prefersDarkMode);
    const [scanPageResult, setScanPageResult] = useState<ElementType[]>([]); 
    const [websiteURL, setWebsiteURL] = useState<string>("");
    const [jsonData, setJsonData] = useState<JsonDataFormat[]>([]);
    const [error, setError] = useState<string | null>(null);


  let dark: String = "light";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      setDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);


  return (
    <Sidepanel
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        scanPageResult={scanPageResult}
        setScanPageResult={setScanPageResult}
        error={error}
        setError={setError}
        websiteURL={websiteURL}
        setWebsiteURL={setWebsiteURL}
        jsonData={jsonData}
        setJsonData={setJsonData}
    ></Sidepanel>
  )
}

//export default Sidebar;
const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <SidepanelContainer />
  </React.StrictMode>
);