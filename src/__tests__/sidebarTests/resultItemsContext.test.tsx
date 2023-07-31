import React, { useContext } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { JsonDataFormat } from '../../interfaces/resultInterfaces';
import { MyContext } from '../../sidebar/components/resultItemsContext';
;

describe('Result Items Context', () => {
  it('should update the context value when setElementResults is called', () => {
    const elementResults: JsonDataFormat[] = [];

    const setElementResults = jest.fn();

    // Prepare a new ElementResult that will be added when the button is clicked
    const newElementResult: JsonDataFormat = {
        element: "<div>Test Element</div>",
        samsvar: "Test Element",
        kommentar: "Test comment",
        side: "http://test.com",
        testregelId: "test1",
        nettlesar: "91.0.4472.124",
        utvidelse: "1.0.0",
        utfall: "Passed",
    };

    // TestComponent that consumes context and has a button to change its value
    const TestComponent = () => {
      const context = useContext(MyContext);

      // Ensure the context is defined before trying to use it
      if (!context) throw new Error("Context is undefined");

      const addElementResult = () => {
        context.setJsonData([
          ...context.jsonData,
          newElementResult,
        ]);
      };

      return (
        <div>
          <button onClick={addElementResult}>Add Element Result</button>
        </div>
      );
    };

    const TestComponentWrapper = () => (
      <MyContext.Provider value={{ jsonData: elementResults, setJsonData: setElementResults }}>
        <TestComponent />
      </MyContext.Provider>
    );

    const { getByText } = render(<TestComponentWrapper />);
    fireEvent.click(getByText('Add Element Result'));

    // Check if setElementResults has been called after the click
    expect(setElementResults).toHaveBeenCalled();

    // And check if it was called with the correct arguments
    expect(setElementResults).toHaveBeenCalledWith([
      ...elementResults,
      newElementResult,
    ]);
  });
});