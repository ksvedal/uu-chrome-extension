import { ButtonSelector } from "../htmlParser/elementSelector";

test('getElements finds the correct buttons', () => {

    // 1. Need an instance of the ButtonSelector
    // 2. Want to use the 'getElements' method
    // 3. Want the 'querySelectorAll' to find all correct elements in a predefined, known DOM
    // 4. 

    const mockDOMElements = document.createElement('div');
    mockDOMElements.innerHTML = `
        <button><button/>
        <button role='menuitem'><button/>
        <button role='button'><button/>
    `
    const querySelectorAllMock = jest.spyOn(mockDOMElements, 'querySelectorAll')
   

    const testButtonSelector = new ButtonSelector()

    testButtonSelector.getElements()

})