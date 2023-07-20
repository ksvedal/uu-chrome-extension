// messageSender.testSetup.tsx
/*
import { MessageSender } from '../../messageObjects/messageSender';

export type ElementObject = {
  title: string;
  htmlString: string;
  selector: string;
  attributes: { name: string; value: string }[];
  result: any;
};

export default function setup() {
  const messageSender: MessageSender = new MessageSender();
  const element: ElementObject = {
    title: "Example Title",
    htmlString: '<div class="example">Hello, world!</div>',
    selector: ".example",
    attributes: [{ name: "contentText", value: "Hello, world!" }],
    result: {
      testID: "",
      name: "Hello, world!",
      htmlString: '<div class="example">Hello, world!</div>',
      correctText: "",
      comment: "",
      checked: false,
      url: "",
      chromeVersion: "",
      chromeExtensionVersion: "",
      outcome: "",
    },
  };

  // Mock chrome.tabs API
  (global as any).chrome = {
    tabs: {
      query: jest.fn(),
      sendMessage: jest.fn(),
    },
  };

  return { messageSender, element };
}
*/

  /*
const setup = () => {
  let messageSender!: MessageSender;
  let element!: ElementObject;

  beforeEach(() => {
    messageSender = new MessageSender();
    element = {
      title: "Example Title",
      htmlString: "<div>Example HTML</div>",
      selector: ".example-selector",
      result: {
        name: "Example Name",
        correctText: "Example Correct Text",
        htmlString: "<div>Example Result HTML</div>",
        comment: "",
        checked: false,
        url: "example.com",
        testID: "example-test-id",
        chromeVersion: "",
        chromeExtensionVersion: "",
        outcome: "Example outcome",
      },
      attributes: [],
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  return { messageSender, element };
};

export default setup;
*/

