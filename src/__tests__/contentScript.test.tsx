import { handleMessage } from "../contentScript";
import { PageInteractor } from "../htmlParser/pageInteractor";
import { WebsiteScanner } from "../htmlParser/websiteScanner";
import {
  HighlightAllMessage,
  HighlightAndRemovePreviousMessage,
  HighlightMessage,
  Message,
  ScanPageMessage,
  UnhighlightAllAndHighlightSingleMessage,} from "../messageObjects/message";
import { ElementType } from "../sidebar/interfaces";

describe('Content Script', () => {
  let pageInteractor: PageInteractor;
  let websiteScanner: WebsiteScanner;
  let messageSender: chrome.runtime.MessageSender;

  beforeEach(() => {
    pageInteractor = new PageInteractor();
    websiteScanner = new WebsiteScanner();
    messageSender = {} as chrome.runtime.MessageSender;
  });
  describe('handleMessage', () => {
    test('should scan the page', () => {
      
      // Mock the messageSender
      const sendResponseMock = jest.fn();
      
      // Create a message object for the 'scanPage' action
      const message: ScanPageMessage = { action: 'scanPage' };

      // Call the handleMessage function
      handleMessage(message, messageSender, sendResponseMock);

      // Verify that sendResponse was called with an array (result of scanPage)
      expect(sendResponseMock).toHaveBeenCalledWith(expect.any(Array));

      // Verify that the page was scanned by checking the number of elements in the response
      const response: ElementType[] = sendResponseMock.mock.calls[0][0]; // Get the response from the mock
      const numElements = response.length;
      expect(numElements).toBeGreaterThan(0); // Assert that at least one element was scanned
      });
    });
  });

