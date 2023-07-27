import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ElementAttributes, AttributeField } from "../../sidebar/elementAttributes";
import { ElementAttribute, ElementResult } from "../../sidebar/interfaces";

const mockElementResult = {
  element: "",
  samsvar: "",
  name: "",
  kommentar: "",
  sjekka: false,
  url: "",
  testregelId: "",
  nettlesar: null,
  utvidelse: null,
  utfall: "",
};

function renderElementAttributes(attributes: ElementAttribute[]) {
  render(
    <ElementAttributes
      attributes={attributes}
      element=""
      title=""
      selector=""
      result={mockElementResult}
      isCommentVisible={false}
    />
  );
}

describe("ElementAttributes", () => {
  // Test for when all attributes are given a value
  test("renders all attributes with correct values when all attributes are provided", () => {
    const attributes = [
      { name: "title", value: "Sample Title" },
      { name: "Role", value: "button" },
      { name: "aria-labelledby", value: "labelID" },
      { name: "aria-label", value: "Label for the element" },
      { name: "Description", value: "A description" },
      { name: "Focusable", value: "true" },
    ];

    renderElementAttributes(attributes);

    expect(screen.getByText("Sample Title")).toBeInTheDocument();
    expect(screen.getByText("button")).toBeInTheDocument();
    expect(screen.getByText("labelID")).toBeInTheDocument();
    expect(screen.getByText("Label for the element")).toBeInTheDocument();
    expect(screen.getByText("A description")).toBeInTheDocument();
    expect(screen.getByText("true")).toBeInTheDocument();
  });


  // Test for when no values are given (empty table)
  test("renders attributes with empty values when no attributes are provided", () => {
    const attributes: ElementAttribute[] = [];

    renderElementAttributes(attributes);

    const attributeTable = screen.getByRole("table");
    expect(attributeTable).toBeInTheDocument();

    // Check that the table body contains rows for each of the predefined attribute names
    const attributeNames = ["aria-labelledby", "aria-label", "title", "Description", "Role", "Focusable"];
    attributeNames.forEach((name) => {
      const attributeNameCell = screen.getByText(name);
      expect(attributeNameCell).toBeInTheDocument();

      // Check that the corresponding value cell is empty
      const valueCell = attributeNameCell.parentElement?.querySelector(".tableBody.value");
      expect(valueCell?.textContent).toBe("");
    });
  });


  // Test for when not all attributes are provided
  test("renders with missing attribute values", () => {
    const attributes = [
      { name: "title", value: "Sample Title" },
      // Missing some attributes in the list
    ];

    renderElementAttributes(attributes);

    // Check that the table body contains rows for each of the predefined attribute names
    const attributeNames = ["aria-labelledby", "aria-label", "title", "Description", "Role", "Focusable"];
    attributeNames.forEach((name) => {
      const attributeNameCell = screen.getByText(name);
      expect(attributeNameCell).toBeInTheDocument();

      // Check that the corresponding value cell contains the correct value for provided attributes,
      // and an empty value cell for missing attributes
      const valueCell = attributeNameCell.parentElement?.querySelector(".tableBody.value");
      if (name === "title") {
        expect(valueCell?.textContent).toBe("Sample Title");
      } else {
        expect(valueCell?.textContent).toBe("");
      }
    });
  });


  // Test for when values are updated
  test("updates attribute values when attributes prop changes", () => {
    const initialAttributes = [
      { name: "title", value: "Initial Title" },
      { name: "Role", value: "initialRole" },
    ];

    renderElementAttributes(initialAttributes);

    expect(screen.getByText("Initial Title")).toBeInTheDocument();
    expect(screen.getByText("initialRole")).toBeInTheDocument();

    const updatedAttributes = [
      { name: "title", value: "Updated Title" },
      { name: "Role", value: "updatedRole" },
    ];

    // Re-render the component with updated attributes
    act(() => {
      renderElementAttributes(updatedAttributes);;
    });

    expect(screen.getByText("Updated Title")).toBeInTheDocument();
    expect(screen.getByText("updatedRole")).toBeInTheDocument();
  });




  // Test for AttributeField
  describe("AttributeField", () => {
    test("renders attribute name and value correctly", () => {
      const attributeName = "title";
      const attributeValue = "Sample Title";

      render(<AttributeField name={attributeName} value={attributeValue} />);

      const attributeNameCell = screen.getByText(attributeName);
      const attributeValueCell = screen.getByText(attributeValue);

      expect(attributeNameCell).toBeInTheDocument();
      expect(attributeValueCell).toBeInTheDocument();
    });
  });
});
