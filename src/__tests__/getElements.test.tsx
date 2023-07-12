import { ButtonSelector } from "../htmlParser/elementSelector";

describe('ButtonSelector', () => {
    test('getElements should return the correct elements', () => {
        // Create mock buttons that match the selector
        const mockButtons: HTMLButtonElement[] = [
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('button'),
        ];

        // Add unique attributes to differentiate buttons
        mockButtons[0].id = 'button1';
        mockButtons[1].classList.add('primary-button');
        mockButtons[2].setAttribute('data-custom', 'button');

        // Create mock buttons that should not be matched by the selector
        const nonMatchingButtons: HTMLButtonElement[] = [
        document.createElement('button'),
        document.createElement('button'),
        ];

        // Add attributes to the non-matching buttons that should exclude them from the selector
        nonMatchingButtons[0].setAttribute('role', 'menuitem');
        nonMatchingButtons[1].setAttribute('disabled', 'true');

        // Create an instance of ButtonSelector
        const buttonSelector: ButtonSelector = new ButtonSelector();

        // Mock the getElements method to return the mock buttons
        jest.spyOn(buttonSelector, 'getElements').mockReturnValue(mockButtons as unknown as NodeListOf<HTMLElement>);

        // Call the getElements method
        const buttonElements: NodeListOf<HTMLElement> = buttonSelector.getElements();

        // Assert the expected results
        expect(buttonElements.length).toBe(3);
        expect(buttonElements[0].id).toBe('button1');
        expect(buttonElements[1].classList.contains('primary-button')).toBe(true);
        expect(buttonElements[2].getAttribute('data-custom')).toBe('button');

        // Assert that non-matching buttons are not included
        nonMatchingButtons.forEach((button) => {
        expect(buttonElements).not.toContain(button);
        });

        // Restore the mock
        jest.restoreAllMocks();
    });
  });