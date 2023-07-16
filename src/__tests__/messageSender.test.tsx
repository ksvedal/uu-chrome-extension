import { MessageSender } from "../messageObjects/messageSender";
import { ElementObject, ElementType } from "../sidebar/interfaces";
import { chrome as jestChrome } from 'jest-chrome';
import { Message, HighlightMessage, ScanPageMessage } from "../messageObjects/message";

const mockMessage: Message = {
  action: "exampleAction",
};

type Tab = chrome.tabs.Tab;

type QueryInfo = chrome.tabs.QueryInfo;

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
    jestChrome.tabs.query.mockImplementation((queryInfo: QueryInfo, callback: (tabs: Tab[]) => void) => {
      // Simulate the active tab with a valid id
      const tabs: Tab[] = [{ id: 1, url: "example.com" }];
      callback(tabs);
    });
  
    // Mock the chrome.tabs.sendMessage function
    jestChrome.tabs.sendMessage.mockImplementation(
      (tabId: number, message: Message, options?: chrome.runtime.MessageSendOptions, callback?: (response: any) => void) => {
        if (typeof callback === 'function') {
          // Simulate the response from sendMessage
          const response = { message: "highlighted" };
          callback(response);
        } else {
          console.log("No callback provided");
        }
      }
    );


  });
  
  

  afterEach(() => {
    // Restore mock implementations
    jestChrome.tabs.query.mockRestore();
    jestChrome.tabs.sendMessage.mockRestore();

    // Clear any other mocks or spies if necessary
    jest.clearAllMocks();
  });

  describe("scanPageMessage", () => {
    it("should send a scan page message to the active tab", () => {
      const callback = jest.fn();

      messageSender.scanPageMessage(callback);

      expect(jestChrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      // Simulate the response from jestChrome.tabs.sendMessage
      (jestChrome.tabs.sendMessage as jest.Mock).mock.calls[0][2](["element1", "element2"]);

      expect(callback).toHaveBeenCalledWith(["element1", "element2"]);
    });

    it("should handle no active tab", () => {
      const callback = jest.fn();

      messageSender.scanPageMessage(callback);

      expect(jestChrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      // Simulate no active tab
      (jestChrome.tabs.sendMessage as jest.Mock).mock.calls[0][2](undefined);

      expect(callback).toHaveBeenCalledWith([]);
    });
  });

  describe("highlightSingleMessage", () => {
    it("should send a highlight single message to the active tab", () => {
      const isChecked = true;

      messageSender.highlightSingleMessage(element, isChecked);

      expect(jestChrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      // Simulate the response from jestChrome.tabs.sendMessage
      (jestChrome.tabs.sendMessage as jest.Mock).mock.calls[0][2]({ message: "highlighted" });

      // You can also check for runtime errors if needed
      expect(jestChrome.runtime.lastError).toBeUndefined();
    });

    it("should handle no active tab", () => {
      const isChecked = true;

      messageSender.highlightSingleMessage(element, isChecked);

      expect(jestChrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      // Simulate no active tab
      (jestChrome.tabs.sendMessage as jest.Mock).mock.calls[0][2](undefined);

      // You can check for runtime errors or other assertions
      expect(jestChrome.runtime.lastError).toBeDefined();
    });
  });

  // Additional tests for other message types...
});
