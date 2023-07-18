import { MessageSender } from "../messageObjects/messageSender";
import { ElementObject, ElementType } from "../sidebar/interfaces";
import {
  Message,
  HighlightMessage,
  HighlightAndRemovePreviousMessage,
  UnhighlightAllAndHighlightSingleMessage,
  HighlightAllMessage,
} from "../messageObjects/message";

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
      options?: chrome.runtime.MessageOptions | undefined,
      responseCallback?: (response: any) => void
    ) => void;
  };
  runtime: {
    lastError: any;
  };
};

describe("MessageSender", () => {
  let messageSender: MessageSender;
  let element: ElementObject;
  let mockElementType: ElementType;

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

    mockElementType = {
      name: "Button",
      nodes: [],
      selector: ".button-selector",
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
        options?: chrome.runtime.MessageOptions | undefined,
        responseCallback?: (response: any) => void
      ) => {
        if (typeof options === "function" && responseCallback) {
          // Simulate the response from sendMessage
          const response = { message: "highlighted" };
          responseCallback(response); // Invoke the callback function
        } else if (typeof options === "undefined" && typeof responseCallback === "function") {
          console.log("No active tab");
          responseCallback([]); // Invoke the callback function
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


  describe("sendMessageToActiveTab", () => {
    let mockMessage: Message;

    beforeEach(() => {
      mockMessage = new HighlightMessage(element, true);
    });

    it("should send a message to the active tab", () => {
      messageSender.sendMessageToActiveTab(mockMessage);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );
      expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(
        1,
        mockMessage,
        undefined,
        expect.any(Function)
      );
      // Add more assertions if needed
    });

    it("should handle no active tab", () => {
      (chrome.tabs.query as jest.Mock).mockImplementationOnce((queryInfo, callback) => {
        callback([]); // Simulate no active tab
      });

      messageSender.sendMessageToActiveTab(mockMessage);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );
      // Add assertions for the behavior when there is no active tab
    });

    // Add more tests for different scenarios
  });

  describe("highlightAndRemovePreviousMessage", () => {
    let mockNewElement: ElementObject;
    let mockPreviousElement: ElementObject;

    beforeEach(() => {
      mockNewElement = {
        title: "New Element Title",
        htmlString: "<div>New Element HTML</div>",
        selector: ".new-element-selector",
        result: {
          name: "New Element Name",
          htmlString: "<div>New Element Result HTML</div>",
          issue: false,
          comment: "",
          checked: false,
          url: "example.com",
          testID: "new-element-test-id",
        },
        attributes: [],
      };

      mockPreviousElement = {
        title: "Previous Element Title",
        htmlString: "<div>Previous Element HTML</div>",
        selector: ".previous-element-selector",
        result: {
          name: "Previous Element Name",
          htmlString: "<div>Previous Element Result HTML</div>",
          issue: false,
          comment: "",
          checked: false,
          url: "example.com",
          testID: "previous-element-test-id",
        },
        attributes: [],
      };
    });

    it("should send a highlight and remove previous message to the active tab", () => {
      const mockMessage = new HighlightAndRemovePreviousMessage(mockNewElement, mockPreviousElement);

      messageSender.sendMessageToActiveTab(mockMessage);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );
      expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(
        1,
        mockMessage,
        undefined,
        expect.any(Function)
      );
      // Add more assertions if needed
    });

    it("should handle no active tab", () => {
      (chrome.tabs.query as jest.Mock).mockImplementationOnce((queryInfo, callback) => {
        callback([]); // Simulate no active tab
      });

      const mockMessage = new HighlightAndRemovePreviousMessage(mockNewElement, mockPreviousElement);

      messageSender.sendMessageToActiveTab(mockMessage);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );
      // Add assertions for the behavior when there is no active tab
    });

    // Add more tests for different scenarios
  });

  describe("highlightAllWithType", () => {
    beforeEach(() => {
      mockElementType = {
        name: "Button",
        nodes: [],
        selector: ".button-selector",
      };
    });

    it("should send a highlight all message with the correct element type", () => {
      const mockIsChecked = true;
      const mockMessage = new HighlightAllMessage(mockElementType, mockIsChecked);

      messageSender.sendMessageToActiveTab(mockMessage);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );
      expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(
        1,
        mockMessage,
        undefined,
        expect.any(Function)
      );
      // Add more assertions if needed
    });

    it("should handle no active tab", () => {
      (chrome.tabs.query as jest.Mock).mockImplementationOnce((queryInfo, callback) => {
        callback([]); // Simulate no active tab
      });

      const mockMessage = new HighlightAllMessage(mockElementType, true);

      messageSender.sendMessageToActiveTab(mockMessage);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );
      // Add assertions for the behavior when there is no active tab
    });

    // Add more tests for different scenarios
  });

  describe("unhighlightAllAndHighlightSingleMessage", () => {
    let mockElement: ElementObject;

    beforeEach(() => {
      mockElement = {
        title: "Example Element Title",
        htmlString: "<div>Example Element HTML</div>",
        selector: ".example-element-selector",
        result: {
          name: "Example Element Name",
          htmlString: "<div>Example Element Result HTML</div>",
          issue: false,
          comment: "",
          checked: false,
          url: "example.com",
          testID: "example-element-test-id",
        },
        attributes: [],
      };
    });

    it("should send an unhighlight all and highlight single message to the active tab", () => {
      const mockMessage = new UnhighlightAllAndHighlightSingleMessage(
        mockElement,
        mockElementType
      );

      messageSender.sendMessageToActiveTab(mockMessage);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );
      expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(
        1,
        mockMessage,
        undefined,
        expect.any(Function)
      );
      // Add more assertions if needed
    });

    it("should handle no active tab", () => {
      (chrome.tabs.query as jest.Mock).mockImplementationOnce((queryInfo, callback) => {
        callback([]); // Simulate no active tab
      });

      const mockMessage = new UnhighlightAllAndHighlightSingleMessage(
        mockElement,
        mockElementType
      );

      messageSender.sendMessageToActiveTab(mockMessage);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );
      // Add assertions for the behavior when there is no active tab
    });

    // Add more tests for different scenarios
  });
});
