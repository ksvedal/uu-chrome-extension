import { handleMessage } from "../contentScript";
import { PageInteractor } from "../htmlParser/pageInteractor";
import { WebsiteScanner } from "../htmlParser/websiteScanner";

describe('Content Script', () => {
  let pageInteractor: PageInteractor;
  let websiteScanner: WebsiteScanner;
  let messageSender: chrome.runtime.MessageSender;

  beforeEach(() => {
    pageInteractor = new PageInteractor();
    websiteScanner = new WebsiteScanner();
    messageSender = {} as chrome.runtime.MessageSender;
  });

  afterEach(() => {
    // Clean up any modifications made to the DOM or other resources
  });

  test('handleMessage should scan the page', () => {
    const sendResponseMock = jest.fn();

    const message = { action: 'scanPage' };
    handleMessage(message, messageSender, sendResponseMock);

    expect(sendResponseMock).toHaveBeenCalledWith(expect.any(Array));
    // Add more assertions to validate the response
  });

  // Write more tests for other actions handled by handleMessage
});
