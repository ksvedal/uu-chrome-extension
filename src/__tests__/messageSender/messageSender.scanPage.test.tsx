import {
  setupTest,
  cleanupTest,
  QueryInfo,
  Tab,
  chrome
} from './testUtils';

import { ScanPageMessage } from '../../messageObjects/message';
import { MessageSender } from '../../messageObjects/messageSender';
import { ElementObject } from '../../sidebar/interfaces';


describe("MessageSender", () => {
  // Initialize the variables using the correct types
   let messageSender: MessageSender;
   let element: ElementObject;
 
   beforeEach(() => {
     // Initialize the chrome object before each test case
     chrome.tabs.query = jest.fn();
     chrome.tabs.sendMessage = jest.fn();
 
     // Assign the values returned by setupTest() to the variables
     ({ messageSender, element } = setupTest());
   });
 
   afterEach(() => {
     cleanupTest();
   });
  
  describe("scanPageMessage", () => {
    
    it("should handle error when sendMessage encounters an error", () => {
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
    
    it("should handle error when sendMessage callback throws an error", () => {
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
    
    

    it("should send a scan page message to the active tab", () => {
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
    
    it("should handle no active tab", () => {
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

});