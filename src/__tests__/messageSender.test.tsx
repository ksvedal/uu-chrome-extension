import { MessageSender } from "../messageObjects/messageSender";
import { MessageType, ElementObject, ElementType } from "../sidebar/interfaces";
import { chrome } from "jest-chrome";
import {
  HighlightMessage,
  ScanPageMessage,
  HighlightAllMessage,
  HighlightAndRemovePreviousMessage,
  UnhighlightAllAndHighlightSingleMessage,
} from "../messageObjects/message";

describe("MessageSender", () => {
    let messageSender: MessageSender;
    let element: ElementObject;
  
    beforeEach(() => {
      messageSender = new MessageSender();
      global.chrome = chrome;
  
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
        },
        attributes: [
          { name: "attribute1", value: "value1" },
          { name: "attribute2", value: "value2" },
        ],
      };
    });
  
    afterEach(() => {
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
  
        const sendMessageCallback = (chrome.tabs.sendMessage as jest.Mock).mock.calls[0][2];
        sendMessageCallback(["element1", "element2"]);
  
        expect(callback).toHaveBeenCalledWith(["element1", "element2"]);
      });
  
      it("should handle no active tab", () => {
        const callback = jest.fn();
  
        messageSender.scanPageMessage(callback);
  
        expect(chrome.tabs.query).toHaveBeenCalledWith(
          { active: true, currentWindow: true },
          expect.any(Function)
        );
  
        const sendMessageCallback = (chrome.tabs.sendMessage as jest.Mock).mock.calls[0][2];
        sendMessageCallback(undefined);
  
        expect(callback).toHaveBeenCalledWith([]);
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
  
        const sendMessageCallback = (chrome.tabs.sendMessage as jest.Mock).mock.calls[0][2];
        sendMessageCallback({ message: "highlighted" });
  
        expect(chrome.runtime.lastError).toBeUndefined();
      });
  
      it("should handle no active tab", () => {
        const isChecked = true;
  
        messageSender.highlightSingleMessage(element, isChecked);
  
        expect(chrome.tabs.query).toHaveBeenCalledWith(
          { active: true, currentWindow: true },
          expect.any(Function)
        );
  
        const sendMessageCallback = (chrome.tabs.sendMessage as jest.Mock).mock.calls[0][2];
        sendMessageCallback(undefined);
  
        expect(chrome.runtime.lastError).toBeDefined();
      });
    });
  
    // Additional tests for other message types...
  });