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

export type MessageOptions = Record<string, any>;

export const chrome: {
  tabs: {
    query: (queryInfo: QueryInfo, callback: QueryCallback) => void;
    sendMessage: (
      tabId: number,
      message: Message,
      options: MessageOptions | undefined, // Use the MessageOptions type
      callback?: (response: any) => void
    ) => void;
  };
  runtime: {
    lastError: any;
  };
} = {
  tabs: {
    query: jest.fn((queryInfo, callback) => {
      // Your mock implementation for chrome.tabs.query
      // For example, you can simulate an active tab with a valid id like this:
      const tabs: Tab[] = [{ id: 1, url: "example.com" }];
      callback(tabs);
    }),
    sendMessage: jest.fn((tabId, message, options, callback) => {
      // Your mock implementation for chrome.tabs.sendMessage
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
    }),
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

      
    return { messageSender, element };
}

export function cleanupTest(): void {
  jest.clearAllMocks();
};

describe("TestUtils", () => {  
  test("Mock test", () => {
    expect(true).toBe(true)
  });
});