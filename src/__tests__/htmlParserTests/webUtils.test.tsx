import { WebUtils } from '../../htmlParser/webUtils';

describe('WebUtils', () => {
    describe('toType', () => {
    test('should convert elements to a type object', () => {
        // Prepare the test data
        const elements = document.querySelectorAll<HTMLElement>('.my-element');
        const type = 'myType';
        const selector = '.my-selector';

        // Call the function
        const result = WebUtils.toType(elements, type, selector);

        // Perform assertions on the result
        expect(result.name).toBe(type);
        expect(result.selector).toBe(selector);
        expect(result.nodes.length).toBe(elements.length);
    });

    test('should handle empty input elements', () => {
        // Prepare the test data
        const elements: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>('.empty-element');
        const type = 'emptyType';
        const selector = '.empty-selector';

        // Call the function
        const result = WebUtils.toType(elements, type, selector);

        // Perform assertions on the result
        expect(result.name).toBe(type);
        expect(result.selector).toBe(selector);
        expect(result.nodes.length).toBe(0);
    });

    test('should handle elements with different classes or types', () => {
        // Prepare the test data
        const elements = document.querySelectorAll<HTMLElement>('.different-element');
        const type = 'differentType';
        const selector = '.different-selector';

        // Call the function
        const result = WebUtils.toType(elements, type, selector);

        // Perform assertions on the result
        expect(result.name).toBe(type);
        expect(result.selector).toBe(selector);
        expect(result.nodes.length).toBe(elements.length);
        // Add additional assertions based on the specific scenario
    });

    });

    describe('toObject', () => {
    test('should convert an element to an object', () => {
        // Prepare the test data
        const element = document.createElement('div');
        element.innerHTML = '<span class="my-class">Hello, world!</span>';

        // Create a stub for the private method
        const generateSelectorSpy = jest.spyOn(WebUtils as any, 'generateSelector');
        generateSelectorSpy.mockReturnValue('.my-selector');

        // Call the function
        const result = WebUtils.toObject(element);

        // Perform assertions on the result
        expect(result.title).toBe('Hello, world!');
        expect(result.htmlString).toBe('<div><span class="my-class">Hello, world!</span></div>');
        expect(result.selector).toBe('.my-selector');
        expect(result.attributes.length).toBe(1);
        expect(result.result.name).toBe('Hello, world!');
        expect(result.result.htmlString).toBe('<div><span class="my-class">Hello, world!</span></div>');
        expect(result.result.correctText).toBe("");
        expect(result.result.comment).toBe('');
        expect(result.result.checked).toBe(false);

        // Verify the private method was called
        expect(generateSelectorSpy).toHaveBeenCalledWith(element);

        // Restore the original private method
        generateSelectorSpy.mockRestore();
    });

    test('should handle elements with different attributes', () => {
        // Prepare the test data
        const element = document.createElement('div');
        element.innerHTML = '<a href="https://example.com" target="_blank">Link</a>';

        // Call the function
        const result = WebUtils.toObject(element);
        
        // Perform assertions on the result
        expect(result.attributes.length).toBe(1);
        // Add additional assertions based on the specific scenario
    });

    test('should handle elements with different tag names', () => {
        // Prepare the test data
        const element = document.createElement('h1');
        element.textContent = 'Heading';

        // Call the function
        const result = WebUtils.toObject(element);

        // Perform assertions on the result
        expect(result.title).toBe('Heading');
        // Add additional assertions based on the specific scenario
    });

    });

    // Rest of the test cases...
    describe('generateSelector', () => {
    test('should generate an index-based selector for an element', () => {
        // Prepare the test data
        const element = document.createElement('div');

        const childSelectors = [];

        for (let i = 1; i <= 5; i++) {
            const child = document.createElement('span');
            element.appendChild(child);
            const selector = (WebUtils as any).generateSelector(child);
            childSelectors.push(selector);

            // Perform assertions for each child element
            expect(childSelectors[i - 1]).toBe(`SPAN:nth-child(${i})`);
        }

    });


    describe('getAttributes', () => {
        test('should get the attributes of an element', () => {
            // Prepare the test data
            const element = document.createElement('div');
            const wantedAttributes = ["aria-labelledby", "aria-label", "aria-expand", "aria-controls", "class", "type", "focusable"];
            
            // Set attributes on the element with unique values
            wantedAttributes.forEach((attribute, index) => {
                element.setAttribute(attribute, 'example data' + index);
            });
            
            // Add a non-wanted attribute to the element
            element.setAttribute('width', '100');
            
            // Call the private method
            const result = (WebUtils as any).getAttributes(element);
            
            // Perform assertions on the result
            expect(result.length).toBe(wantedAttributes.length + 1);
            
            result.forEach((attribute: { name: any; value: any; }, index: number) => {
                if (index === wantedAttributes.length) {
                expect(attribute.name).toBe('contentText');
                expect(attribute.value).toBe('');
                } else {
                expect(attribute.name).toBe(wantedAttributes[index]);
                expect(attribute.value).toBe('example data' + index);
                }
            });
        });
    });
            

    describe('getTitle', () => {
        test('should get the title of an element', () => {
        // Prepare the test data
        const element = document.createElement('div');
        element.textContent = 'Hello, world!';

        // Call the private method
        const result = (WebUtils as any).getTitle(element);

        // Perform assertions on the result
        expect(result).toBe('Hello, world!');
        });

        test('should handle elements with no inner_text', () => {
        // Prepare the test data
        const element = document.createElement('div');
        element.setAttribute('aria-labelledby', 'label-id');

        // Call the private method
        const result = (WebUtils as any).getTitle(element);

        // Perform assertions on the result
        expect(result).toBe('label-id');
        });
        });  
    });
});