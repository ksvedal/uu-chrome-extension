import { PageInteractor } from '../../htmlParser/pageInteractor';
import { HighlightMessage, HighlightAllMessage, HighlightAndRemovePreviousMessage, UnhighlightAllAndHighlightSingleMessage } from '../../messageObjects/message';
import { mock, MockProxy } from 'jest-mock-extended';
import { ElementObject } from '../../sidebar/interfaces';

// Create mock HTMLElement
let mockElem: MockProxy<HTMLElement>;

beforeEach(() => {
  // Create a new mock HTMLElement before each test
  mockElem = mock<HTMLElement>();

  // Mock global document object with jest.fn()
  document.querySelector = jest.fn();
  document.querySelectorAll = jest.fn();
});

test('test handleHighlightSingle', () => {
  const mockElementObject: ElementObject = {
    selector: ".class-selector",
    title: "Mock Title",
    htmlString: "<div>Mock HTML String</div>",
    result: {
      htmlString: "<div>Mock HTML String</div>",
      correctText: "Mock Correct Text",
      name: "Mock Name",
      comment: "Mock Comment",
      checked: false,
      url: "http://mockurl.com",
      testID: "MockTestID",
      chromeVersion: "Mock Chrome Version",
      chromeExtensionVersion: "Mock Chrome Extension Version",
      outcome: "Mock outcome",
    },
    attributes: [
      {
        name: "Mock Name",
        value: "Mock Value",
      },
    ],
    isCommentVisible: false,
  };

  const message = new HighlightMessage(mockElementObject, false);
  const pageInteractor = new PageInteractor();

  // When querySelector is called, return the mock element
  (document.querySelector as jest.Mock).mockReturnValue(mockElem);
  mockElem.classList.add = jest.fn();

  // Test the method
  pageInteractor.handleHighlightSingle(message);

  // Assertions
  expect(document.querySelector).toHaveBeenCalledWith(mockElementObject.selector);
  expect(mockElem.classList.add).toHaveBeenCalledWith('highlight');
});

test('test highlightAllWithType', () => {
  const mockElementType = {
    name: "Mock Type",
    nodes: [],
    selector: ".mock-selector",
  };
  const message = new HighlightAllMessage(mockElementType, false);
  const pageInteractor = new PageInteractor();

  const mockElements: MockProxy<HTMLElement>[] = [
    mock<HTMLElement>(),
    mock<HTMLElement>(),
    mock<HTMLElement>(),
  ];

  // When querySelectorAll is called, return the mock node list
  (document.querySelectorAll as jest.Mock).mockReturnValue(mockElements);

  mockElements.forEach((mockElement) => {
    mockElement.classList.add = jest.fn();
    mockElement.classList.remove = jest.fn();
  });

  // Test the method
  pageInteractor.highlightAllWithType(message);

  // Assertions
  expect(document.querySelectorAll).toHaveBeenCalledWith(mockElementType.selector);
  mockElements.forEach((mockElement) => {
    expect(mockElement.classList.add).toHaveBeenCalledWith('highlight');
    expect(mockElement.classList.remove).not.toHaveBeenCalled();
  });

  // Reset mock
  mockElements.forEach((mockElement) => {
    (mockElement.classList.add as jest.Mock).mockReset();
    (mockElement.classList.remove as jest.Mock).mockReset();
  });

  // Update the message to set isChecked to true
  message.isChecked = true;

  // Test the method again with isChecked set to true
  pageInteractor.highlightAllWithType(message);

  // Assertions
  expect(document.querySelectorAll).toHaveBeenCalledWith(mockElementType.selector);
  mockElements.forEach((mockElement) => {
    expect(mockElement.classList.add).not.toHaveBeenCalled();
    expect(mockElement.classList.remove).toHaveBeenCalledWith('highlight');
  });
});

test('test highlightAndRemovePrevious', () => {
  const mockPreviousElementObject: ElementObject = {
    selector: ".previous-selector",
    title: "Mock Previous Title",
    htmlString: "<div>Mock Previous HTML String</div>",
    result: {
      htmlString: "<div>Mock Previous HTML String</div>",
      correctText: "Mock Previous Correct Text",
      name: "Mock Previous Name",
      comment: "Mock Previous Comment",
      checked: false,
      url: "http://mockpreviousurl.com",
      testID: "MockPreviousTestID",
      chromeVersion: "Mock Previous Chrome Version",
      chromeExtensionVersion: "Mock Previous Chrome Extension Version",
      outcome: "Mock outcome",
    },
    attributes: [
      {
        name: "Mock Previous Name",
        value: "Mock Previous Value",
      },
    ],
    isCommentVisible: false,
  };

  const mockNewElementObject: ElementObject = {
    selector: ".new-selector",
    title: "Mock New Title",
    htmlString: "<div>Mock New HTML String</div>",
    result: {
      htmlString: "<div>Mock New HTML String</div>",
      correctText: "Mock New Correct Text",
      name: "Mock New Name",
      comment: "Mock New Comment",
      checked: false,
      url: "http://mocknewurl.com",
      testID: "MockNewTestID",
      chromeVersion: "Mock New Chrome Version",
      chromeExtensionVersion: "Mock New Chrome Extension Version",
      outcome: "Mock outcome",
    },
    attributes: [
      {
        name: "Mock New Name",
        value: "Mock New Value",
      },
    ],
    isCommentVisible: false,
  };

  const message = new HighlightAndRemovePreviousMessage(mockNewElementObject, mockPreviousElementObject);
  const pageInteractor = new PageInteractor();

  // When querySelector is called, return the mock elements
  (document.querySelector as jest.Mock)
    .mockReturnValueOnce(mockElem) // Previous element
    .mockReturnValueOnce(mockElem); // New element

  mockElem.classList.remove = jest.fn();
  mockElem.classList.add = jest.fn();
//   mockElem.focus = jest.fn();
//   mockElem.scrollIntoView = jest.fn();

  // Test the method
  pageInteractor.highlightAndRemovePrevious(message);

  // Assertions
  expect(document.querySelector).toHaveBeenCalledWith(mockPreviousElementObject.selector);
  expect(document.querySelector).toHaveBeenCalledWith(mockNewElementObject.selector);
  expect(mockElem.classList.remove).toHaveBeenCalledWith('highlight');
  expect(mockElem.classList.add).toHaveBeenCalledWith('highlight');
  expect(mockElem.focus).toHaveBeenCalled();
  expect(mockElem.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
});

test('test unhighlightAllAndHighlightSingle', () => {
    const mockElementType = {
      name: 'Mock Type',
      nodes: [],
      selector: '.mock-selector',
    };
  
    const mockElementObject: ElementObject = {
      selector: '.highlight',
      title: 'Mock Title',
      htmlString: '<div>Mock HTML String</div>',
      result: {
        htmlString: '<div>Mock HTML String</div>',
        correctText: 'Mock Correct Text',
        name: 'Mock Name',
        comment: 'Mock Comment',
        checked: false,
        url: 'http://mockurl.com',
        testID: 'MockTestID',
        chromeVersion: 'Mock Chrome Version',
        chromeExtensionVersion: 'Mock Chrome Extension Version',
        outcome: "Mock outcome"
      },
      attributes: [
        {
          name: 'Mock Name',
          value: 'Mock Value',
        },
      ],
      isCommentVisible: false,
    };
  
    const message = new UnhighlightAllAndHighlightSingleMessage(
      mockElementObject,
      mockElementType
    );
    const pageInteractor = new PageInteractor();
  
    const mockElements: MockProxy<HTMLElement>[] = [mock<HTMLElement>()];
    const mockSingleElement: MockProxy<HTMLElement> = mock<HTMLElement>();
  
    // When querySelectorAll is called, return the mock node list with one element
    (document.querySelectorAll as jest.Mock).mockReturnValue(mockElements);
  
    // When querySelector is called, return the single mock element
    (document.querySelector as jest.Mock).mockReturnValue(mockSingleElement);
  
    mockElements.forEach((mockElement) => {
      mockElement.classList.remove = jest.fn();
    });
  
    mockSingleElement.classList.add = jest.fn();
    // mockSingleElement.focus = jest.fn();
    // mockSingleElement.scrollIntoView = jest.fn();
  
    // Test the method
    pageInteractor.unhighlightAllAndHighlightSingle(message);
  
    // Assertions
    expect(document.querySelectorAll).toHaveBeenCalledWith(
      mockElementType.selector
    );
    expect(mockElements[0].classList.remove).toHaveBeenCalledWith('highlight');
  
    expect(document.querySelector).toHaveBeenCalledWith(
      mockElementObject.selector
    );
    expect(mockSingleElement.classList.add).toHaveBeenCalledWith('highlight');
    expect(mockSingleElement.focus).toHaveBeenCalled();
    expect(mockSingleElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
    });
  });

  // ... (existing code)

test('test focusAndScroll', () => {
    const mockElementSelector = '.mock-selector';
    const mockElement: MockProxy<HTMLElement> = mock<HTMLElement>();
  
    // When querySelector is called, return the mock element
    (document.querySelector as jest.Mock).mockReturnValue(mockElement);
  
    mockElement.classList.remove = jest.fn();
    mockElement.classList.add = jest.fn();
    // mockElement.focus = jest.fn();
    // mockElement.scrollIntoView = jest.fn();
  
    const pageInteractor = new PageInteractor();
  
    // Test the method
    pageInteractor['focusAndScroll'](mockElementSelector);
  
    // Assertions
    expect(document.querySelector).toHaveBeenCalledWith(mockElementSelector);
    expect(mockElement.classList.remove).not.toHaveBeenCalledWith('highlight');
    expect(mockElement.classList.add).toHaveBeenCalledWith('highlight');
    expect(mockElement.focus).toHaveBeenCalled();
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
  });


test('test addStyleToElement', () => {
  const mockElement: MockProxy<HTMLElement> = mock<HTMLElement>();
  const highlightClass = 'highlight';

  mockElement.classList.add = jest.fn();

  const pageInteractor = new PageInteractor();

  // Test the method
  pageInteractor['addStyleToElement'](mockElement);

  // Assertions
  expect(mockElement.classList.add).toHaveBeenCalledWith(highlightClass);
});

test('test removeStyleFromElement', () => {
    const mockElement: MockProxy<HTMLElement> = mock<HTMLElement>();
    const highlightClass = 'highlight';
  
    mockElement.classList.remove = jest.fn();
  
    const pageInteractor = new PageInteractor();
  
    // Test the method
    pageInteractor['removeStyleFromElement'](mockElement);
  
    // Assertions
    expect(mockElement.classList.remove).toHaveBeenCalledWith(highlightClass);
  });