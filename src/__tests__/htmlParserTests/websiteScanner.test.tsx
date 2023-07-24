// Import the necessary classes and interfaces for the tests
// Note: Please adjust the paths according to your project structure
import { WebsiteScanner } from "../../htmlParser/websiteScanner";
import { ButtonSelector, ImageSelector, LinkSelector, MenuItems, Headings } from "../../htmlParser/elementSelector";
import { ElementType, ElementObject } from "../../sidebar/interfaces";
// Define the ElementSelector type
type ElementSelector = ButtonSelector | ImageSelector | LinkSelector | MenuItems | Headings;

// Mock chrome.tabs.query function
jest.mock('chrome', () => ({
  tabs: {
    query: (queryInfo: any, callback: any) => {
      const fakeTabs = [{ url: "https://example.com" }];
      callback(fakeTabs);
    }
  }
}));

describe('WebsiteScanner', () => {
  let websiteScanner: WebsiteScanner;

  beforeEach(() => {
    const selectors: { [key: string]: ElementSelector } = {
      "Buttons": new ButtonSelector(),
      "Images": new ImageSelector(),
      "Links": new LinkSelector(),
      "Headings": new Headings(),
      "MenuItems": new MenuItems()
    };
    websiteScanner = new WebsiteScanner();
  });

  test('scanPage returns an array of ElementType', () => {
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

  test('getWebsiteURL calls the callback with the website URL', () => {
    const url = "https://example.com";
    const callback = jest.fn();

    // Mock chrome.tabs.query to return a fake tab
    const fakeTabs = [{ url }];
    global.chrome.tabs.query = jest.fn().mockImplementation((_, cb) => cb(fakeTabs));

    websiteScanner.getWebsiteURL(callback);

    expect(callback).toHaveBeenCalledWith(url);
  });
});