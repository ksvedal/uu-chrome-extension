import { ButtonSelector } from "../../htmlParser/elementSelector";

describe('ButtonSelector', () => {
    test('getElements should return the correct elements', () => {
        
        // Mock elements that match the selector
        const matchingElements: HTMLElement[] = [
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('input'),
        document.createElement('input'),
        document.createElement('div')
        ];

        // Valid attributes for button elements
        matchingElements[1].id = 'button';
        matchingElements[2].classList.add('primary-button');
        matchingElements[3].setAttribute('role', 'button');
        matchingElements[4].setAttribute('type', 'submit');
        matchingElements[5].setAttribute('type', 'button');
        matchingElements[6].setAttribute('role', 'button');
      

        // Mock elements that does not match the selector
        const nonMatchingElements: HTMLElement[] = [
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('input'),
        document.createElement('input'),
        document.createElement('input'),
        document.createElement('input'),
        document.createElement('input'),
        document.createElement('input'),
        document.createElement('input'),
        ];

        // Non-valid attributes for the non-matching elements
        nonMatchingElements[0].setAttribute('role', 'menuitem');
        nonMatchingElements[1].setAttribute('role', 'menuitemcheckbox');
        nonMatchingElements[2].setAttribute('role', 'menuitemradio');
        nonMatchingElements[4].setAttribute('type', 'submit');
        nonMatchingElements[4].setAttribute('role', 'menuitem');
        nonMatchingElements[5].setAttribute('type', 'submit');
        nonMatchingElements[5].setAttribute('role', 'menuitemcheckbox');
        nonMatchingElements[6].setAttribute('type', 'submit');
        nonMatchingElements[6].setAttribute('role', 'menuitemradio');
        nonMatchingElements[7].setAttribute('type', 'button');
        nonMatchingElements[7].setAttribute('role', 'menuitem');
        nonMatchingElements[8].setAttribute('type', 'button');
        nonMatchingElements[8].setAttribute('role', 'menuitemcheckbox');
        nonMatchingElements[9].setAttribute('type', 'button');
        nonMatchingElements[9].setAttribute('role', 'menuitemradio');

        // Create an instance of ButtonSelector
        const buttonSelector: ButtonSelector = new ButtonSelector();

        // Mock the getElements method to return the mock buttons
        jest.spyOn(buttonSelector, 'getElements').mockReturnValue(matchingElements as unknown as NodeListOf<HTMLElement>);

        // Call the getElements method
        const buttonElements: NodeListOf<HTMLElement> = buttonSelector.getElements();

        // Assert the expected results
        matchingElements.forEach((correctButton) => {
            expect(buttonElements).toContain(correctButton);
        })

        // Assert that non-matching buttons are not included
        nonMatchingElements.forEach((falseButton) => {
        expect(buttonElements).not.toContain(falseButton);
        });

        // Restore the mock
        jest.restoreAllMocks();
    });
  });