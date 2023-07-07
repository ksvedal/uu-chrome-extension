# Universal Design Analyzer Extension

## About

This extension analyzes the current website and tests various properties against WCAG (Web Content Accessibility Guidelines) requirements. It focuses on evaluating the following important properties:

### Intuitive and User-Friendly Buttons

The extension checks if buttons are designed in a way that makes them easy to understand and use for users. It verifies the intuitive nature of buttons to enhance user experience and accessibility.

### Alternative Text for Non-Text Content

It verifies whether images and non-text items have appropriate alternative text. Alternative text provides a textual description of the content, enabling users with visual impairments to understand the meaning conveyed by these elements.

## Target audience

This extension is created for developers who wish to automate tests on their websites. It's specifically designed for developers who already have some experience in web development, including HTML, CSS, and JavaScript. Having prior knowledge of accessibility guidelines (such as WCAG) and a basic understanding of UX design principles is beneficial. Additionally, being proficient in using accessibility evaluation tools and staying updated with the latest industry trends can further enhance the advantages of using this extension. 
Knowledge of the various methods to code a button will also prove useful, as this extension aims to distinguish between well-designed buttons and poorly-designed ones.

## Setup

To set up the extension, follow these steps:

1. Open the root directory of the extension in a terminal.

2. Run the following commands in the terminal:


    ```npm install```

    ```npm run build```

    This will install the necessary dependencies and build the extension.

3. After the build process is complete, a new directory named 'dist' will be created.

4. Load the 'dist' directory into Chrome to use the extension.

## User Manual

1. Click on the UU Extension. A side panel titled "Button Seeker" will appear.

2. Click on "Scan Page". You will see a header displaying the logo and URL of the respective page. There are collapsible categories for Buttons, Images, Links, Headings, and MenuItems. Each category has a "Highlight All" button that you can click to highlight all elements belonging to that category. Clicking the "Highlight All" button again will remove the highlighting. The number of items in each category is also displayed.

3. You can expand one or multiple categories to display all the elements within that category. The expandable items will have a corresponding "Jump to" button that highlights the element and scrolls to it. Clicking the "Jump to" button again will remove the highlighting. Additionally, you have the option to leave a comment related to the element.

4. If you expand an element, a table will appear showing the element's attributes and their associated values, along with the HTML for that element.

5. If you wish to inspect the data in another tab, you can click on "View in table".

## Troubleshooting

To be added later.

## Extension Architecture

![Domain model](DomainModel.png)

## Extension Preview

![Extension screenshot](/images/extension_screenshot.jpg)

## Conclusion 

To be added later.
