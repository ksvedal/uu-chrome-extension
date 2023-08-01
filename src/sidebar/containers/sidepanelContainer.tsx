import { useEffect, useState } from "react";
import { JsonDataFormat } from "../../interfaces/resultInterfaces";
import { Sidepanel } from "../components/sidepanel";
import React from "react";
import { ElementType } from "../../interfaces/elementInterfaces";
import { createRoot } from "react-dom/client";
import { fetchData, toggleDarkMode } from "../utils/sidebarUtils";


export const SidepanelContainer: React.FC = () => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [darkMode, setDarkMode] = useState(prefersDarkMode);
    const [scanPageResult, setScanPageResult] = useState<ElementType[]>([]); 
    const [websiteURL, setWebsiteURL] = useState<string>("");
    const [jsonData, setJsonData] = useState<JsonDataFormat[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [computedProperties, setComputedProperties] = useState<JSON | null>(null);

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


    const handleFetchData = () => {
      fetchData(setScanPageResult, setError, setWebsiteURL, setComputedProperties)
    }

    const handleToggleDarkMode = () => {
      toggleDarkMode(setDarkMode, darkMode)
    }

    return (
      <Sidepanel
          darkMode={darkMode}
          scanPageResult={scanPageResult}
          error={error}
          websiteURL={websiteURL}
          jsonData={jsonData}
          setJsonData={setJsonData}
          handleFetchData={handleFetchData}
          handleToggleDarkMode={handleToggleDarkMode}
          computedProperties={computedProperties}
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