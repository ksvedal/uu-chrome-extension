// Import necessary dependencies and libraries
import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { CollapsibleTypeContainer } from "../../sidebar/containers/collapsibleTypeContainer";

// Describe the test suite for the 'CollapsibleItemType' component
describe("CollapsibleItemType", () => {
  // Define the test case: "should render without crashing"
  it("should render without crashing", () => {
    // Prepare the mock data for the 'type' prop
    const type = {
        name: "Test Type",
        nodes: [
          {
            title: "Test Element",
            element: "",
            selector: "",
            result: {
              element: "",
              samsvar: "",
              name: "",
              kommentar: "",
              sjekka: false,
              side: "",
              testregelId: "",
              nettlesar: null,
              utvidelse: null,
              utfall: "",
            },
            attributes: [],
            isCommentVisible: false, // Add the isCommentVisible property here
          },
        ],
        selector: "some-selector", // Add a valid selector here
      };
      

    // Log a message indicating that the component is being rendered
    console.log("Rendering CollapsibleItemType...");

    // Render the 'CollapsibleItemType' component with the mock props
    const { container } = render(
      <CollapsibleTypeContainer
        elementType={type}
        // thisElement={null}
        // isAllHighlighted={false}
        // setIsAllHighlighted={() => {}}
        // setCurrentHighlighted={() => {}}
        // parentIndex={0}
        url=""
        // testID=""
      />
    );

    // Log a message indicating that the component was rendered successfully
    console.log("CollapsibleItemType rendered successfully!");

    // Perform the test's primary assertion: Check if the container is in the document
    expect(container).toBeInTheDocument();

    // Optionally, you can use snapshot testing to compare the rendered output with a predefined snapshot
    expect(container).toMatchSnapshot();
  });
});