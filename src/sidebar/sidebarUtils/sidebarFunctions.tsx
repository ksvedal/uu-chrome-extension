import { WebsiteScanner } from "../../htmlParser/websiteScanner";
import { ElementType } from "../../interfaces/interfaces";
import { MessageSender } from "../../messageObjects/messageSender";


const _message: MessageSender = new MessageSender();
const _scan: WebsiteScanner = new WebsiteScanner();


export const fetchData = (
    setScanPageResult:React.Dispatch<React.SetStateAction<ElementType[]>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setWebsiteURL: React.Dispatch<React.SetStateAction<string>>
    ) => {
    _message.scanPageMessage((response: ElementType[]) => {
      if (response == null || response.length === 0) {
        const errorMsg = "No response from the content script or the response is empty. Refresh the page and try again.";
        console.error(errorMsg);
        setError(errorMsg); // update error state with the error message
        return;
      }
      setScanPageResult(response); // update the state with the response data
      setError(null); // clear the error message if no error occurs
    });
    _scan.getWebsiteURL((url: string) => {
      if (!url) {
        const errorMsg = "Failed to get the website URL.";
        console.error(errorMsg);
        setError(errorMsg); // update error state with the error message
        return;
      }
      setWebsiteURL(url); // update the state with the response data
      setError(null); // clear the error message if no error occurs
    });

  };
  

export const toggleDarkMode = (
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>,
    darkMode: boolean
) => {
    setDarkMode(!darkMode);
}