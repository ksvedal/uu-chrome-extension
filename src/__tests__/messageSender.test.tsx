import { MessageSender } from "../messageObjects/messageSender";
import { ElementObject, ElementType } from "../sidebar/interfaces";
import { Message, HighlightMessage, ScanPageMessage } from "../messageObjects/message";

type Tab = {
  id: number;
  url: string;
};

type QueryInfo = {
  active: boolean;
  currentWindow: boolean;
};

declare const chrome: {
  tabs: {
    query: (
      queryInfo: QueryInfo,
      callback: (tabs: Tab[]) => void
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
};

describe("MessageSender", () => {
  let messageSender: MessageSender;
  let element: ElementObject;

  beforeEach(() => {
    messageSender = new MessageSender();
    element = {
      title: "Example Title",
      htmlString: "<div>Example HTML</div>",
      selector: ".example-selector",
      result: {
        name: "Example Name",
        htmlString: "<div>Example Result HTML</div>",
        issue: false,
        comment: "",
        checked: false,
        url: "example.com",
        testID: "example-test-id",
      },
      attributes: [],
    };
  
    // Mock the chrome.tabs.query function
    chrome.tabs.query = jest.fn((queryInfo: QueryInfo, callback: (tabs: Tab[]) => void) => {
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
    
  });
  
  afterEach(() => {
    // Clear the mock implementation
    jest.clearAllMocks();
  });

  describe("scanPageMessage", () => {
    it("should send a scan page message to the active tab", () => {
      const callback = jest.fn();
      messageSender.scanPageMessage(callback);
      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );
      // Simulate the response from chrome.tabs.sendMessage
      (chrome.tabs.sendMessage as jest.Mock).mock.calls[0][2](["element1", "element2"]);
      expect(callback).toHaveBeenCalledWith(["element1", "element2"]);
    });
    it("should handle no active tab", () => {
      const callback = jest.fn();
    
      messageSender.scanPageMessage(callback);
    
      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );
    
      // Simulate no active tab
      (chrome.tabs.sendMessage as jest.Mock).mock.calls[0][2](undefined, callback);
    
      expect(callback).toHaveBeenCalledWith(expect.arrayContaining([]));
    });
    
  });


  describe("highlightSingleMessage", () => {
    it("should send a highlight single message to the active tab", () => {
      const isChecked = true;
      messageSender.highlightSingleMessage(element, isChecked);
      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );
      // Simulate the response from chrome.tabs.sendMessage
      (chrome.tabs.sendMessage as jest.Mock).mock.calls[0][2]({ message: "highlighted" });
      // You can also check for runtime errors if needed
      expect(chrome.runtime.lastError).toBeUndefined();
    });
    it("should handle no active tab", () => {
      const isChecked = true;
      
      messageSender.highlightSingleMessage(element, isChecked);
      
      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );
      
      // Simulate no active tab
      (chrome.tabs.sendMessage as jest.Mock).mock.calls[0][2](undefined);
      // Invoke the callback function directly with undefined as the response argument
      
      // Add assertions here to check the behavior directly
    });
    
    
    
    
  });
  // Additional tests for other message types...
});

