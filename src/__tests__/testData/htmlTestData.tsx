
// Create a mock 'element' object that will be used in the tests
export  const divElementObject = {
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
    isCommentVisible: false
  };

export const buttonElementObject = {
  title: 'Button',
  htmlString: '<button>Click me</button>',
  selector: '.button-class',
  attributes: [{ name: 'type', value: 'button' }],
  isCommentVisible: false,
  result: {
    testID: 'button-test-id',
    name: 'ButtonElement',
    htmlString: '<button>Click me</button>',
    correctText: 'Click me',
    comment: 'This is a button element',
    checked: false,
    url: 'https://example.com/button',
    chromeVersion: '94.0.4606.81',
    chromeExtensionVersion: '1.2.3',
    outcome: 'success',
  },
};
  

export const imageElementObject = {
  title: 'Image',
  htmlString: '<img src="image.jpg" alt="Mock Image">',
  selector: '.image-class',
  attributes: [{ name: 'width', value: '200' }, { name: 'height', value: '150' }],
  isCommentVisible: false,
  result: {
    testID: 'image-test-id',
    name: 'ImageElement',
    htmlString: '<img src="image.jpg" alt="Mock Image">',
    correctText: '',
    comment: 'This is an image element',
    checked: false,
    url: 'https://example.com/image',
    chromeVersion: '94.0.4606.81',
    chromeExtensionVersion: '1.2.3',
    outcome: 'success',
  },
};

export const linkElementObject = {
  title: 'Link',
  htmlString: '<a href="https://example.com">Click here</a>',
  selector: '.link-class',
  attributes: [{ name: 'target', value: '_blank' }],
  isCommentVisible: false,
  result: {
    testID: 'link-test-id',
    name: 'LinkElement',
    htmlString: '<a href="https://example.com">Click here</a>',
    correctText: 'Click here',
    comment: 'This is a link element',
    checked: false,
    url: 'https://example.com/link',
    chromeVersion: '94.0.4606.81',
    chromeExtensionVersion: '1.2.3',
    outcome: 'success',
  },
};

export const headingElementObject = {
  title: 'Heading',
  htmlString: '<h1>Heading 1</h1>',
  selector: '.heading-class',
  attributes: [{ name: 'role', value: 'heading' }],
  isCommentVisible: false,
  result: {
    testID: 'heading-test-id',
    name: 'HeadingElement',
    htmlString: '<h1>Heading 1</h1>',
    correctText: 'Heading 1',
    comment: 'This is a heading element',
    checked: false,
    url: 'https://example.com/heading',
    chromeVersion: '94.0.4606.81',
    chromeExtensionVersion: '1.2.3',
    outcome: 'success',
  },
};

export const menuItemElementObject = {
  title: 'MenuItem',
  htmlString: '<li>Menu Item 1</li>',
  selector: '.menu-item-class',
  attributes: [{ name: 'data-id', value: 'menu-1' }],
  isCommentVisible: false,
  result: {
    testID: 'menu-item-test-id',
    name: 'MenuItemElement',
    htmlString: '<li>Menu Item 1</li>',
    correctText: 'Menu Item 1',
    comment: 'This is a menu item element',
    checked: false,
    url: 'https://example.com/menu-item',
    chromeVersion: '94.0.4606.81',
    chromeExtensionVersion: '1.2.3',
    outcome: 'success',
  },
};
