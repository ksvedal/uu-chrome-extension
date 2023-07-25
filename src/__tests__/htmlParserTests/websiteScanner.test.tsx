// Import the necessary classes and interfaces for the tests
// Note: Please adjust the paths according to your project structure
import { WebsiteScanner } from "../../htmlParser/websiteScanner";
import { ElementSelector, ButtonSelector, ImageSelector, LinkSelector, MenuItems, Headings } from "../../htmlParser/elementSelector";
import { ElementType, ElementObject } from "../../sidebar/interfaces";
import { testElementObject } from "../testData/htmlTestData";

// Mock chrome.tabs.query function
jest.mock('chrome', () => ({
    tabs: {
      query: (queryInfo: any, callback: any) => {
        const fakeTabs = [{ url: "https://example.com" }];
        callback(fakeTabs);
      }
    }
  }));

const mockSelectors: { [key: string]: ElementSelector } = {
    "Buttons": new ButtonSelector(),
    "Images": new ImageSelector(),
    "Links": new LinkSelector(),
    "Headings": new Headings(),
    "MenuItems": new MenuItems(),
};

describe('WebsiteScanner', () => {
  let websiteScanner: WebsiteScanner;
  
  beforeEach(() => {

    websiteScanner = new WebsiteScanner(mockSelectors);
    // Mock the getElements functions in mockSelectors
    const buttonElementNodes = [
        createMockElementNode("button", "Click me", { type: "submit" }),
        createMockElementNode("button", "Submit", { type: "button" }),
      ];
  
      const imageElementNodes = [
        createMockElementNode("img", "", { src: "example.jpg", alt: "Example image" }),
        createMockElementNode("img", "", { src: "another.jpg", alt: "Another image" }),
      ];
  
      const linkElementNodes = [
        createMockElementNode("a", "Home", { href: "https://example.com", target: "_self" }),
        createMockElementNode("a", "About", { href: "https://example.com/about", target: "_blank" }),
      ];
  
      const headingElementNodes = [
        createMockElementNode("h1", "Welcome to our website"),
        createMockElementNode("h2", "About Us"),
      ];
  
      const menuItemsElementNodes = [
        createMockElementNode("div", "Menu Item 1", { role: "menuitem" }),
        createMockElementNode("div", "Menu Item 2", { role: "menuitem" }),
      ];
  
      // Helper function to create a mock element node
      function createMockElementNode(tagName: string, textContent: string, attributes: { [key: string]: string } = {}) {
        const element = document.createElement(tagName);
        element.textContent = textContent;
        for (const attr in attributes) {
          element.setAttribute(attr, attributes[attr]);
        }
        return {
          tagName,
          textContent,
          attributes,
        };
      }
      
    mockSelectors["Buttons"].getElements = jest.fn().mockReturnValue(buttonElementNodes);
    mockSelectors["Images"].getElements = jest.fn().mockReturnValue(imageElementNodes);
    mockSelectors["Links"].getElements = jest.fn().mockReturnValue(linkElementNodes);
    mockSelectors["Headings"].getElements = jest.fn().mockReturnValue(headingElementNodes);
    mockSelectors["MenuItems"].getElements = jest.fn().mockReturnValue(menuItemsElementNodes);
  
    });

    test('scanPage returns an array of ElementType with non-empty nodes', () => {
        const scanResult = websiteScanner.scanPage();
      
        // Check if all ElementType have non-empty nodes
        for (const result of scanResult) {
          expect(result.nodes.length).toBeGreaterThan(0);
        }
      });

  test('scanPage returns an empty array of ElementType when nothing is detected', () => {
    websiteScanner = new WebsiteScanner();
    const expectedResult: ElementType[] = [
      {
        name: 'Buttons',
        nodes: [] as ElementObject[], // An array of ElementObject instances
        selector: "button:not([role='menuitem']):not([role='menuitemcheckbox']):not([role='menuitemradio']), input[type='submit']:not([role='menuitem']):not([role='menuitemcheckbox']):not([role='menuitemradio']), input[type='button']:not([role='menuitem']):not([role='menuitemcheckbox']):not([role='menuitemradio']), [role='button']:not([role='menuitem']):not([role='menuitemcheckbox']):not([role='menuitemradio'])",
      },
      {
        name: 'Images',
        nodes: [] as ElementObject[], // An array of ElementObject instances
        selector: "img:not([role='button'])",
      },
      {
        name: 'Links',
        nodes: [] as ElementObject[], // An array of ElementObject instances
        selector: "a:not([role='button'])",
      },
      {
        name: 'Headings',
        nodes: [] as ElementObject[], // An array of ElementObject instances
        selector: "h1, h2, h3, h4, h5, h6",
      },
      {
        name: 'MenuItems',
        nodes: [] as ElementObject[], // An array of ElementObject instances
        selector: "[role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio']",
      },
    ];

    const scanResult = websiteScanner.scanPage();
    expect(scanResult).toEqual(expectedResult);
  });
  

  test('getWebsiteURL calls the callback not to be called when active tab URL is not available', () => {
    const callback = jest.fn();
  
    // Mock chrome.tabs.query to return no active tab
    global.chrome.tabs.query = jest.fn().mockImplementation((_, cb) => cb([]));
  
    websiteScanner.getWebsiteURL(callback);
  
    expect(callback).not.toHaveBeenCalled();
  });
  
  test('getWebsiteURL calls the callback with the website URL when active tab URL is available', () => {
    const url = "https://example.com";
    const callback = jest.fn();
  
    // Mock chrome.tabs.query to return a fake active tab with the URL
    const fakeTabs = [{ url }];
    global.chrome.tabs.query = jest.fn().mockImplementation((_, cb) => cb(fakeTabs));
  
    websiteScanner.getWebsiteURL(callback);
  
    expect(callback).toHaveBeenCalledWith(url);
  });

  test('scanPage returns correct ElementObject instances for each ElementType', () => {
    const scanResult = websiteScanner.scanPage();
  
    // Define the different ElementTypes to test
    const elementTypesToTest = ['Buttons', 'Images', 'Links', 'Headings', 'MenuItems'];
  
    for (const elementType of elementTypesToTest) {
      const elementTypeResult = scanResult.find((result) => result.name === elementType);
      const elementTypeNodes = elementTypeResult?.nodes ?? [];
  
      // Ensure that the returned nodes are not empty for this ElementType
      expect(elementTypeNodes.length).toBeGreaterThan(0);
  
      // Check the structure of each ElementObject instance for this ElementType
      for (const element of elementTypeNodes) {
        expect(element.title).toBeDefined();
        expect(element.htmlString).toBeDefined();
        expect(element.selector).toBeDefined();
        expect(element.result).toBeDefined();
        expect(element.attributes).toBeDefined();
        expect(element.isCommentVisible).toBeDefined();
        console.log(element);
      }
    }
  });

});