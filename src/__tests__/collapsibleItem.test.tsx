import React from "react";
import { render } from "@testing-library/react";
import { CollapsibleItemType } from "../sidebar/collapsibleItem";
import '@testing-library/jest-dom/extend-expect';


describe("CollapsibleItemType", () => {
    it("should render without crashing", () => {
      const type = {
        name: "Test Type",
        nodes: [
          {
            title: "Test Element",
            htmlString: "",
            selector: "",
            result: {
              htmlString: "",
              correctText: "",
              name: "",
              comment: "",
              checked: false,
              url: "",
              testID: "",
              chromeVersion: null,
              chromeExtensionVersion: null,
              outcome: "",
            },
            attributes: [],
          },
        ],
        selector: "some-selector", // Add a valid selector here
      };
  
      console.log("Rendering CollapsibleItemType...");
      const { container } = render(
        <CollapsibleItemType
          type={type}
          thisElement={null}
          isAllHighlighted={false}
          setIsAllHighlighted={() => {}}
          setCurrentHighlighted={() => {}}
          parentIndex={0}
          url=""
          testID=""
        />
      );
      console.log("CollapsibleItemType rendered successfully!");
  
      // You can also log the rendered container to inspect its content
      expect(container).toBeInTheDocument();

      // You can also use snapshot testing if needed
      expect(container).toMatchSnapshot();
    });

});
  
    // Add more tests for different functionalities if needed




