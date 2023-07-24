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
import { ElementObject, ElementType } from "../sidebar/interfaces";

describe('Content Script', () => {
  let pageInteractor: PageInteractor;
  let websiteScanner: WebsiteScanner;
  let sender: chrome.runtime.MessageSender;

  beforeEach(() => {
    pageInteractor = new PageInteractor();
    websiteScanner = new WebsiteScanner();
    sender = {} as chrome.runtime.MessageSender;
  });



  //CASE: scanPage
  test('handleMessage should scan the page', () => {
    
    // Mock the `sendResponse` function
    const sendResponseMock = jest.fn();

    // Create a message object for the 'scanPage' action
    const testMessage: ScanPageMessage = { action: 'scanPage' };

    // Call the handleMessage function
    handleMessage(testMessage, sender, sendResponseMock);

    // Verify that sendResponse was called with an array (result of scanPage)
    expect(sendResponseMock).toHaveBeenCalledWith(expect.any(Array));

    // Verify that the page was scanned by checking the number of elements in the response
    const response: ElementType[] = sendResponseMock.mock.calls[0][0]; // Get the response from the mock
    const numElements = response.length;
    expect(numElements).toBeGreaterThan(0); // Assert that at least one element was scanned
  });




  // skal sjekke at case highlightElement bruker handleHighlighSingle på _page 
  // der handleHighlighSingle i pageInteractor tar inn en message av typen HighlightMessage
  // der klassen highlightMessage har et element: Elementobject og isChecked: boolean
  // der ElementObject i interfaces har string, string, Elementresult, Elementattribute
  // der Elementresult har string, boolean, osv.. ok og ElementAttribute har string, string.

  // CASE: highlighElement
  test('handleMessage should highlight a single element', () => {
  
    const sendResponseMock = jest.fn();
  
    // ElementObject for HighlighMessage
    const testElement: ElementObject = {
      title: 'Test Element',
      htmlString: '<div>Test Element</div>',
      selector: 'div.test-element',
      result: {
        htmlString: '<div>Test Element</div>',
        correctText: 'string',
        name: 'string',
        comment: 'string',
        checked: true,
        url: 'string',
        testID: 'string',
        chromeVersion: '',
        chromeExtensionVersion: 'string | null',
        outcome: 'string'
      },
      attributes: [
        { name: 'attribute1', value: 'value1' },
        { name: 'attribute2', value: 'value2' },
      ],
      isCommentVisible: true,
    };

    // HighlightMessage for handleHighlightSingle
    const testMessage: HighlightMessage = {
      action: 'highlightElement',
      element: testElement,
      isChecked: false,
    };

    // Call the handleMessage function
    handleMessage(testMessage, sender, sendResponseMock);



  });

});