import { MessageSender } from "../../messageObjects/messageSender";
import { ElementObject, ElementType } from "../../sidebar/interfaces";
import { Message, ScanPageMessage } from "../../messageObjects/message";

export type Tab = {
  id: number;
  url: string;
};

export type QueryInfo = {
  active: boolean;
  currentWindow: boolean;
};

export type QueryCallback = (tabs: Tab[]) => void;

export let chrome: {
    tabs: {
      query: (
        queryInfo: QueryInfo,
        callback: QueryCallback
      ) => void;
      sendMessage: (
        tabId: number,
        message: Message,
        options: chrome.runtime.MessageOptions | undefined,
        callback?: (response: any) => void
      ) => void;
    };
    runtime: {
      lastError: any;
    };
  } = {
    tabs: {
      query: () => {},
      sendMessage: () => {},
    },
    runtime: {
      lastError: null,
    },
  };


export function setupTest() {
    let messageSender: MessageSender; // Declare messageSender variable
    let element: ElementObject; // Declare element variable

    messageSender = new MessageSender();
    element = {
      title: "Example Title",
      htmlString: "<div>Example HTML</div>",
      selector: ".example-selector",
      result: {
        name: "Example Name",
        correctText: "Example Correct Text",
        htmlString: "<div>Example Result HTML</div>",
        comment: "",
        checked: false,
        url: "example.com",
        testID: "example-test-id",
        chromeVersion: "",
        chromeExtensionVersion: "",
        outcome: "Example outcome",
      },
      attributes: [],
    };

    // Mock the chrome.tabs.query function
    chrome.tabs.query = jest.fn((queryInfo: QueryInfo, callback: QueryCallback) => {
      // Simulate the active tab with a valid id
      const tabs: Tab[] = [{ id: 1, url: "example.com" }];
      callback(tabs);
    });

     // Mock the chrome.tabs.sendMessage function
     chrome.tabs.sendMessage = jest.fn(
      (
        tabId: number,
        message: Message,
        options?: chrome.runtime.MessageOptions | undefined | ((response: any) => void),
        callback?: (response: any) => void
      ) => {
        if (typeof options === "function") {
          // Simulate the response from sendMessage
          const response = { message: "highlighted" };
          options(response); // Invoke the callback function
        } else if (typeof options === "undefined" && typeof callback === "function") {
          console.log("No active tab");
          callback([]); // Invoke the callback function
        } else {
          console.log("Invalid parameters for sendMessage");
        }
      }
    );
    return { messageSender, element };
}

export function cleanupTest(): void {
  jest.clearAllMocks();
}