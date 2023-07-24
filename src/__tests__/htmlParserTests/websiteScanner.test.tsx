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
  
    // Assertions for 'Buttons' ElementType
    const buttonsElementType = scanResult.find((result) => result.name === "Buttons");
    const buttonsNodes = buttonsElementType?.nodes ?? [];
  
    const elementResult = testElementObject.result;

    const testElementObject2 = {
        result: {
          checked: false,
          chromeExtensionVersion: "",
          chromeVersion: "",
          comment: "",
          correctText: "Expected correct text for buttons",
          htmlString: "<div>Expected Result HTML for buttons</div>",
          name: "Expected Name for buttons",
          outcome: "Expected outcome for buttons",
          testID: "expected-test-id-for-buttons",
          url: "expected-url-for-buttons",
        },
      };
  
    expect(buttonsNodes).toEqual([
      {
        title: "Click me",
        htmlString: "<button type=\"submit\">Click me</button>",
        selector: mockSelectors["Buttons"].selector,
        result: elementResult,
        attributes: { type: "submit" },
        isCommentVisible: false,
      },
      {
        title: "Submit",
        htmlString: "<button type=\"button\">Submit</button>",
        selector: mockSelectors["Buttons"].selector,
        result: elementResult,
        attributes: { type: "button" },
        isCommentVisible: false,
      },
    ]);
  
    expect(buttonsNodes).toEqual([
        {
        title: "Click me",
        htmlString: "<button type=\"submit\">Click me</button>",
        selector: mockSelectors["Buttons"].selector,
        result: elementResult, // Replace this with the expected value of ElementResult for buttons
        attributes: { type: "submit" }, // Replace this with the expected attributes for buttons
        isCommentVisible: false, // Replace this with the expected value for comments visibility
        },
        {
        title: "Submit",
        htmlString: "<button type=\"button\">Submit</button>",
        selector: mockSelectors["Buttons"].selector,
        result: elementResult, // Replace this with the expected value of elementResult for buttons
        attributes: { type: "button" }, // Replace this with the expected attributes for buttons
        isCommentVisible: false, // Replace this with the expected value for comments visibility
        },
    ]);
    
    // Assertions for 'Images' ElementType
    const imagesElementType = scanResult.find((result) => result.name === "Images");
    const imagesNodes = imagesElementType?.nodes ?? []; // Use an empty array if imagesElementType is undefined

    expect(imagesNodes).toEqual([
        {
        title: "",
        htmlString: "<img src=\"example.jpg\" alt=\"Example image\">",
        selector: mockSelectors["Images"].selector,
        result: elementResult, // Replace this with the expected value of elementResult for images
        attributes: { src: "example.jpg", alt: "Example image" }, // Replace this with the expected attributes for images
        isCommentVisible: false, // Replace this with the expected value for comments visibility
        },
        {
        title: "",
        htmlString: "<img src=\"another.jpg\" alt=\"Another image\">",
        selector: mockSelectors["Images"].selector,
        result: elementResult, // Replace this with the expected value of elementResult for images
        attributes: { src: "another.jpg", alt: "Another image" }, // Replace this with the expected attributes for images
        isCommentVisible: false, // Replace this with the expected value for comments visibility
        },
    ]);
    
    // Assertions for 'Links' ElementType
    const linksElementType = scanResult.find((result) => result.name === "Links");
    const linksNodes = linksElementType?.nodes ?? []; // Use an empty array if linksElementType is undefined

    expect(linksNodes).toEqual([
        {
        title: "Home",
        htmlString: "<a href=\"https://example.com\" target=\"_self\">Home</a>",
        selector: mockSelectors["Links"].selector,
        result: elementResult, // Replace this with the expected value of elementResult for links
        attributes: { href: "https://example.com", target: "_self" }, // Replace this with the expected attributes for links
        isCommentVisible: false, // Replace this with the expected value for comments visibility
        },
        {
        title: "About",
        htmlString: "<a href=\"https://example.com/about\" target=\"_blank\">About</a>",
        selector: mockSelectors["Links"].selector,
        result: elementResult, // Replace this with the expected value of elementResult for links
        attributes: { href: "https://example.com/about", target: "_blank" }, // Replace this with the expected attributes for links
        isCommentVisible: false, // Replace this with the expected value for comments visibility
        },
    ]);
    
    // Assertions for 'Headings' ElementType
    const headingsElementType = scanResult.find((result) => result.name === "Headings");
    const headingsNodes = headingsElementType?.nodes ?? []; // Use an empty array if headingsElementType is undefined

    expect(headingsNodes).toEqual([
        {
        title: "Welcome to our website",
        htmlString: "<h1>Welcome to our website</h1>",
        selector: mockSelectors["Headings"].selector,
        result: elementResult, // Replace this with the expected value of elementResult for headings
        attributes: {}, // Replace this with the expected attributes for headings
        isCommentVisible: false, // Replace this with the expected value for comments visibility
        },
        {
        title: "About Us",
        htmlString: "<h2>About Us</h2>",
        selector: mockSelectors["Headings"].selector,
        result: elementResult, // Replace this with the expected value of elementResult for headings
        attributes: {}, // Replace this with the expected attributes for headings
        isCommentVisible: false, // Replace this with the expected value for comments visibility
        },
    ]);
    
    // Assertions for 'MenuItems' ElementType
    const menuItemsElementType = scanResult.find((result) => result.name === "MenuItems");
    const menuItemsNodes = menuItemsElementType?.nodes ?? []; // Use an empty array if menuItemsElementType is undefined

    expect(menuItemsNodes).toEqual([
        {
        title: "Menu Item 1",
        htmlString: "<div role=\"menuitem\">Menu Item 1</div>",
        selector: mockSelectors["MenuItems"].selector,
        result: elementResult, // Replace this with the expected value of elementResult for menu items
        attributes: { role: "menuitem" }, // Replace this with the expected attributes for menu items
        isCommentVisible: false, // Replace this with the expected value for comments visibility
        },
        {
        title: "Menu Item 2",
        htmlString: "<div role=\"menuitem\">Menu Item 2</div>",
        selector: mockSelectors["MenuItems"].selector,
        result: elementResult, // Replace this with the expected value of elementResult for menu items
        attributes: { role: "menuitem" }, // Replace this with the expected attributes for menu items
        isCommentVisible: false, // Replace this with the expected value for comments visibility
        },
    ]);
    });
    
  });

 