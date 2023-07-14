import { MessageSender } from "../messageObjects/messageSender";
import { ElementObject, ElementType } from "../sidebar/interfaces";
import { chrome as jestChrome } from 'jest-chrome';

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
        url: "example.com" // Add the 'url' property here
      },
      attributes: [
        { name: "attribute1", value: "value1" },
        { name: "attribute2", value: "value2" },
      ],
    };


    // Assign the jest-chrome mock to the global chrome object
    global.chrome = jestChrome as any; // Use 'as any' type assertion
  });

  afterEach(() => {
    // Restore any spies or stubs if necessary
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
      (jestChrome.tabs.sendMessage as jest.Mock).mock.calls[0][1](["element1", "element2"]);

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
      (jestChrome.tabs.sendMessage as jest.Mock).mock.calls[0][1](undefined);

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
      (jestChrome.tabs.sendMessage as jest.Mock).mock.calls[0][1]({ message: "highlighted" });

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
      (jestChrome.tabs.sendMessage as jest.Mock).mock.calls[0][1](undefined);

      // You can check for runtime errors or other assertions
      expect(jestChrome.runtime.lastError).toBeDefined();
    });
  });

  // Additional tests for other message types...
});
