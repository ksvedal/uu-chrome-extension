import { ElementObject, ElementType } from "../sidebar/interfaces";
import { HighlightMessage, ScanPageMessage, HighlightAllMessage } from "./message";

export class MessageSender{

    public scanPageMessage(callback: (response: ElementType[]) => void) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab?.id) {
                chrome.tabs.sendMessage(activeTab.id, new ScanPageMessage, callback);
            }
        });
        return true;
    }


    /* public highlightSingleMessage(element: ElementObject){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0].id) {
              console.log("Kjører med en tab id");
              chrome.tabs.sendMessage(tabs[0].id, new HighlightMessage(element), (msg) => {console.log("Result message: " + msg)});
               }else{
                console.log("No tab id");
                 }
              });
              return true;
    } */


    public highlightSingleMessage(element: ElementObject, isChecked : boolean){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]?.id) {
              console.log("Running with a tab id");
              chrome.tabs.sendMessage(tabs[0].id, new HighlightMessage(element, isChecked), (response) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                } else {
                    console.log("Result message: " + response.message);
                }
              });
           }else{
                console.log("No tab id");
           }
        });
        return true;
    }   

    public highlightAllWithType(element: ElementType, isChecked : boolean){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]?.id) {
              console.log("Running with a tab id");
              chrome.tabs.sendMessage(tabs[0].id, new HighlightAllMessage(element, isChecked), (response) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                } else {
                    console.log("Result message: " + response.message);
                }
              });
           }else{
                console.log("No tab id");
           }
        });
        return true;
    }   
    


    
}