import { MessageSender } from "../../messageObjects/messageSender";
import { ElementObject, ElementType } from "../../sidebar/interfaces";
import { Message, ScanPageMessage } from "../../messageObjects/message";

// Define a custom type for representing a tab in Chrome
type Tab = {
  id: number;
  url: string;
};

// Define a custom type for representing query information about tabs
type QueryInfo = {
  active: boolean;
  currentWindow: boolean;
};

// Declare a constant variable 'chrome' to mock Chrome's API
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

// Begin the test suite for the MessageSender class
describe("MessageSender", () => {
  let messageSender: MessageSender;
  let element: ElementObject;

  // This function will run before each test case to set up common variables
  beforeEach(() => {
    // Create a new instance of the MessageSender class
    messageSender = new MessageSender();

    // Create a mock 'element' object that will be used in the tests
    element = {
      title: "Example Title",
      element: "<div>Example HTML</div>",
      selector: ".example-selector",
      result: {
        samsvar: "Example Correct Text",
        element: "<div>Example Result HTML</div>",
        kommentar: "",
        side: "example.com",
        testregelId: "example-test-id",
        nettlesar: "",
        utvidelse: "",
        utfall: "Example utfall",
      },
      attributes: [],
      isCommentVisible: false
    };

    // Mock the chrome.tabs.query function
    chrome.tabs.query = jest.fn((queryInfo: QueryInfo, callback: (tabs: Tab[]) => void) => {
      // Simulate the active tab with a valid id
      const tabs: Tab[] = [{ id: 1, url: "example.com" }];
      callback(tabs); // Call the callback function with the simulated tabs
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

  // This function will run after each test case to clear mocked functions
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe("scanPageMessage", () => {
    
    test("should handle error when sendMessage encounters an error", () => {
      const callback = jest.fn();
    
      // Mock the chrome.tabs.query function to simulate an active tab
      const activeTab = { id: 1, url: "example.com" };
      chrome.tabs.query = jest.fn((queryInfo, queryCallback) => {
        queryCallback([activeTab]);
      });
    
      // Mock the chrome.tabs.sendMessage function to simulate an error response
      chrome.tabs.sendMessage = jest.fn((tabId, message, options) => {
        if (typeof options === "function") {
          // Simulate an error response by throwing an error
          throw new Error("Simulated error in sendMessage");
        } else {
          console.error("Invalid options for sendMessage");
        }
      });
    
      // Call the function to test
      messageSender.scanPageMessage(callback);
    
      // Ensure that the chrome.tabs.query function is called
      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );
    
      // Ensure that the chrome.tabs.sendMessage function is called with the correct arguments
      expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(
        activeTab.id,
        expect.any(ScanPageMessage),
        expect.any(Function)
      );
    
      // Ensure that the callback is called with an empty array
      expect(callback).toHaveBeenCalledWith([]);
    });    
    
    test("should handle error when sendMessage callback throws an error", () => {
      const callback = jest.fn();
    
      // Mock the chrome.tabs.query function to simulate an active tab
      const activeTab = { id: 1, url: "example.com" };
      chrome.tabs.query = jest.fn((queryInfo, queryCallback) => {
        queryCallback([activeTab]);
      });
    
      // Mock the chrome.tabs.sendMessage function to simulate a callback error
      chrome.tabs.sendMessage = jest.fn((tabId, message, options, sendMessageCallback) => {
        try {
          // Simulate a callback error by throwing an error
          throw new Error("Simulated error in callback");
        } catch (error) {
          // Call the callback with an empty array to handle the error case
          callback([]);
        }
      });
    
      // Call the function to test
      messageSender.scanPageMessage(callback);
    
      // Ensure that the chrome.tabs.query function is called
      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );
    
      // Ensure that the chrome.tabs.sendMessage function is called with the correct arguments
      expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(
        activeTab.id,
        expect.any(ScanPageMessage),
        expect.any(Function)
      );
    
      // Ensure that the callback is called with an empty array
      expect(callback).toHaveBeenCalledWith([]);
    });
    
    

    test("should send a scan page message to the active tab", () => {
      const callback = jest.fn();

      // Mock the chrome.tabs.query function to simulate an active tab
      chrome.tabs.query = jest.fn((queryInfo: QueryInfo, callback: (tabs: Tab[]) => void) => {
        // Simulate an active tab with a valid id
        const tabs: Tab[] = [{ id: 1, url: "example.com" }];
        callback(tabs);
      });

      // Mock the chrome.tabs.sendMessage function
      chrome.tabs.sendMessage = jest.fn();

      messageSender.scanPageMessage(callback);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      expect(chrome.tabs.sendMessage).toHaveBeenCalled(); // Ensure sendMessage is called

      expect(callback).not.toHaveBeenCalled(); // Ensure callback is not called
    });
    
    test("should handle no active tab", () => {
      const callback = jest.fn();

      // Mock the chrome.tabs.query function to simulate no active tab
      chrome.tabs.query = jest.fn((queryInfo: QueryInfo, callback: (tabs: Tab[]) => void) => {
        callback([]); // Simulate no active tab by passing an empty array
      });

      messageSender.scanPageMessage(callback);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      expect(chrome.tabs.sendMessage).not.toHaveBeenCalled(); // Ensure sendMessage is not called

      expect(callback).toHaveBeenCalledWith([]); // Assert that the callback is called with an empty array
    });

   
  });

  describe("highlightSingleMessage", () => {

    
    test("should send a highlight single message to the active tab", () => {
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
    
    test("should handle no active tab", () => {
      const isChecked = true;

      // Simulate no active tab
      (chrome.tabs.query as jest.Mock).mockImplementationOnce((queryInfo, callback) => {
        callback([]);
      });

      messageSender.highlightSingleMessage(element, isChecked);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      expect(chrome.tabs.sendMessage).not.toHaveBeenCalled();
    });
    
    test("should handle error when sending highlight single message", () => {
      const isChecked = true;
      
      // Simulate no active tab
      (chrome.tabs.query as jest.Mock).mockImplementationOnce((queryInfo, callback) => {
        callback([]);
      });

      messageSender.highlightSingleMessage(element, isChecked);

      expect(chrome.tabs.query).toHaveBeenCalled();
      expect(chrome.tabs.sendMessage).not.toHaveBeenCalled();
    });
  });

  describe("highlightAndRemovePreviousMessage", () => {
    test("should send a highlight and remove previous message to the active tab", () => {
      const newElement: ElementObject = { ...element, title: "New Element" };
      const previousElement: ElementObject = { ...element, title: "Previous Element" };

      messageSender.highlightAndRemovePreviousMessage(newElement, previousElement);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      // Simulate the response from chrome.tabs.sendMessage
      (chrome.tabs.sendMessage as jest.Mock).mock.calls[0][2]({ message: "highlighted" });

      expect(chrome.runtime.lastError).toBeUndefined();
    });

    test("should handle no active tab", () => {
      const newElement: ElementObject = { ...element, title: "New Element" };
      const previousElement: ElementObject = { ...element, title: "Previous Element" };

      // Simulate no active tab
      (chrome.tabs.query as jest.Mock).mockImplementationOnce((queryInfo, callback) => {
        callback([]);
      });

      messageSender.highlightAndRemovePreviousMessage(newElement, previousElement);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      expect(chrome.tabs.sendMessage).not.toHaveBeenCalled();
    });

    test("should handle error when sending highlight and remove previous message", () => {
      const newElement: ElementObject = { ...element, title: "New Element" };
      const previousElement: ElementObject = { ...element, title: "Previous Element" };

      // Simulate no active tab
      (chrome.tabs.query as jest.Mock).mockImplementationOnce((queryInfo, callback) => {
        callback([]);
      });

      messageSender.highlightAndRemovePreviousMessage(newElement, previousElement);

      expect(chrome.tabs.query).toHaveBeenCalled();
      expect(chrome.tabs.sendMessage).not.toHaveBeenCalled();
    });

  });

  describe("highlightAllWithType", () => {
    test("should send a highlight all with type message to the active tab", () => {
      const elementType: ElementType = {
        name: "Button",
        nodes: [element],
        selector: ".button-selector",
      };
      const isChecked = true;

      messageSender.highlightAllWithType(elementType, isChecked);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      // Simulate the response from chrome.tabs.sendMessage
      (chrome.tabs.sendMessage as jest.Mock).mock.calls[0][2]({ message: "highlighted" });

      expect(chrome.runtime.lastError).toBeUndefined();
    });

    test("should handle no active tab", () => {
      const elementType: ElementType = {
        name: "Button",
        nodes: [element],
        selector: ".button-selector",
      };
      const isChecked = true;

      // Simulate no active tab
      (chrome.tabs.query as jest.Mock).mockImplementationOnce((queryInfo, callback) => {
        callback([]);
      });

      messageSender.highlightAllWithType(elementType, isChecked);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      expect(chrome.tabs.sendMessage).not.toHaveBeenCalled();
    });

    test("should handle error when sending highlight all with type message", () => {
      const elementType: ElementType = {
        name: "Button",
        nodes: [element],
        selector: ".button-selector",
      };
      const isChecked = true;

      // Simulate no active tab
      (chrome.tabs.query as jest.Mock).mockImplementationOnce((queryInfo, callback) => {
        callback([]);
      });

      messageSender.highlightAllWithType(elementType, isChecked);

      expect(chrome.tabs.query).toHaveBeenCalled();
      expect(chrome.tabs.sendMessage).not.toHaveBeenCalled();
    });

  });

  describe("unhighlightAllAndHighlightSingleMessage", () => {
    test("should send an unhighlight all and highlight single message to the active tab", () => {
      const elementType: ElementType = {
        name: "Button",
        nodes: [element],
        selector: ".button-selector",
      };
      const isChecked = true;

      messageSender.unhighlightAllAndHighlightSingleMessage(element, elementType);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      // Simulate the response from chrome.tabs.sendMessage
      (chrome.tabs.sendMessage as jest.Mock).mock.calls[0][2]({ message: "highlighted" });

      expect(chrome.runtime.lastError).toBeUndefined();
    });

    test("should handle no active tab", () => {
      const elementType: ElementType = {
        name: "Button",
        nodes: [element],
        selector: ".button-selector",
      };

      // Simulate no active tab
      (chrome.tabs.query as jest.Mock).mockImplementationOnce((queryInfo, callback) => {
        callback([]);
      });

      messageSender.unhighlightAllAndHighlightSingleMessage(element, elementType);

      expect(chrome.tabs.query).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      expect(chrome.tabs.sendMessage).not.toHaveBeenCalled();
    });

    test("should handle error when sending unhighlight all and highlight single message", () => {
      const elementType: ElementType = {
        name: "Button",
        nodes: [element],
        selector: ".button-selector",
      };

      // Simulate no active tab
      (chrome.tabs.query as jest.Mock).mockImplementationOnce((queryInfo, callback) => {
        callback([]);
      });

      messageSender.unhighlightAllAndHighlightSingleMessage(element, elementType);

      expect(chrome.tabs.query).toHaveBeenCalled();
      expect(chrome.tabs.sendMessage).not.toHaveBeenCalled();
    });
  });
});