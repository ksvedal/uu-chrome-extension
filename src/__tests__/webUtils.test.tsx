import { WebUtils } from '../htmlParser/webUtils';

describe('WebUtils', () => {
  describe('toType', () => {
    it('should convert elements to a type object', () => {
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

    it('should handle empty input elements', () => {
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

    it('should handle elements with different classes or types', () => {
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
    it('should convert an element to an object', () => {
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
      expect(result.result.issue).toBe(false);
      expect(result.result.comment).toBe('');
      expect(result.result.checked).toBe(false);

      // Verify the private method was called
      expect(generateSelectorSpy).toHaveBeenCalledWith(element);

      // Restore the original private method
      generateSelectorSpy.mockRestore();
    });

    it('should handle elements with different attributes', () => {
      // Prepare the test data
      const element = document.createElement('div');
      element.innerHTML = '<a href="https://example.com" target="_blank">Link</a>';

      // Call the function
      const result = WebUtils.toObject(element);
      
      // Perform assertions on the result
      expect(result.attributes.length).toBe(1);
      // Add additional assertions based on the specific scenario
    });

    it('should handle elements with different tag names', () => {
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
    it('should generate an index-based selector for an element', () => {
       // Prepare the test data
       const element = document.createElement('div');

       const childSelectors = [];

       for (let i = 1; i <= 5; i++) {
            const child = document.createElement('span');
            element.appendChild(child);
            const selector = (WebUtils as any).generateSelector(child);
            childSelectors.push(selector);
       }

       // Perform assertions on the result
       expect(childSelectors[0]).toBe('SPAN:nth-child(1)');
       expect(childSelectors[1]).toBe('SPAN:nth-child(2)');
       expect(childSelectors[2]).toBe('SPAN:nth-child(3)');
       expect(childSelectors[3]).toBe('SPAN:nth-child(4)');
       expect(childSelectors[4]).toBe('SPAN:nth-child(5)');
    });

    
    describe('getAttributes', () => {
        it('should get the attributes of an element', () => {
          
          //Array of wanted attributes, which is used to filter out unwanted attributes. 
          const wantedAttributes = ["aria-labelledby", "aria-label", "aria-expand", "aria-controls","class","type","focusable"]
          
          //Unwanted attributes are attributes that are not relevant for the user to see, therefore the attribute contentText is set to empty string.
          const unwantedAttributes = ['width', 'height', 'viewBox', 'fill', 'xmlns', "media", "sizes", "data-srcset", "itemprop", "itemtype", "srcset", "itemscope", "clip-rule", "fill-rule", "d", "data-ec-variant", "data-ec-position", "data-ga-category", "data-ga-label", "data-ga-action", "data-ga-value", "data-ga-non-interaction", "data-ga-event", "data-ga-event-category", "data-ga-event-action", "data-ga-event-label", "data-ga-event-value", "data-ga-event-non-interaction", "da", "cx", "cy", "r", "stroke", "stroke-width", "stroke-linejoin", "stroke-linecap", "stroke-width", "style", "content", "src"]; 
          
          //All attributes
          const allAttributes = wantedAttributes.concat(unwantedAttributes);

          // Prepare the test data
          const element = document.createElement('div');
        
          //Loop through all wanted attributes and add them to the element
          for (let i = 0; i < allAttributes.length; i++) {
            element.setAttribute(allAttributes[i], 'example data' + i);
          }
          
          // Call the private method
          const result = (WebUtils as any).getAttributes(element);
          
          console.log(result);

          // Perform assertions on the result
          expect(result.length).toBe(wantedAttributes.length + 1);

          //Loop through all wanted attributes and check if they are in the result. Unwanted attributes should be saved as | contentText: "" |, the last space.
          for (let i = 0; i < wantedAttributes.length; i++) { 
            expect(result[i].name).toBe(wantedAttributes[i]);
            expect(result[i].value).toBe('example data' + i);
          }

          //Check if contentText is the last attribute in the result.
          expect(result[wantedAttributes.length].name).toBe("contentText");

         
        });
    

      });
  });

  describe('getTitle', () => {
    it('should get the title of an element', () => {
      // Prepare the test data
      const element = document.createElement('div');
      element.textContent = 'Hello, world!';

      // Call the private method
      const result = (WebUtils as any).getTitle(element);

      // Perform assertions on the result
      expect(result).toBe('Hello, world!');
    });

    it('should handle elements with no inner_text', () => {
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
