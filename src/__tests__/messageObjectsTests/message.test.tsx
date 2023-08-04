import {
  HighlightMessage,
  HighlightAndRemovePreviousMessage,
  UnhighlightAllAndHighlightSingleMessage,
  HighlightAllMessage,
  ScanPageMessage,
} from "../../messageObjects/message";

describe("Messages", () => {
  describe("HighlightMessage", () => {
    it("should create a highlight message", () => {
      // Prepare the test data
      const element = { /* mock element object */ };
      const elementTypeName = "";
      const isChecked = true;

      // Create the highlight message
      const highlightMessage = new HighlightMessage(element as any, elementTypeName as any, isChecked);

      // Perform assertions on the message properties
      expect(highlightMessage.action).toBe("highlightElement");
      expect(highlightMessage.element).toBe(element);
      expect(highlightMessage.isChecked).toBe(isChecked);
    });
  });

  describe("HighlightAndRemovePreviousMessage", () => {
    it("should create a highlight and remove previous message", () => {
      // Prepare the test data
      const newElement = { /* mock new element object */ };
      const newElementTypeName = "";
      const previousElement = { /* mock previous element object */ };
      const typeNamesOfElements = "";

      // Create the highlight and remove previous message
      const highlightAndRemovePreviousMessage = new HighlightAndRemovePreviousMessage(
        newElement as any,
        
        previousElement as any,
        typeNamesOfElements as any
      );

      // Perform assertions on the message properties
      expect(highlightAndRemovePreviousMessage.action).toBe("highlightAndRemovePrevious");
      expect(highlightAndRemovePreviousMessage.newElement).toBe(newElement);
      expect(highlightAndRemovePreviousMessage.previousElement).toBe(previousElement);
    });
  });

  describe("UnhighlightAllAndHighlightSingleMessage", () => {
    it("should create an unhighlight all and highlight single message", () => {
      // Prepare the test data
      const element = { /* mock element object */ };
      const elementTypeName = "";
      const elementType = "someElementType";

      // Create the unhighlight all and highlight single message
      const unhighlightAllAndHighlightSingleMessage = new UnhighlightAllAndHighlightSingleMessage(
        element as any,
        elementTypeName as any,
        elementType as any
      );

      // Perform assertions on the message properties
      expect(unhighlightAllAndHighlightSingleMessage.action).toBe("unhighlightAllAndHighlightSingle");
      expect(unhighlightAllAndHighlightSingleMessage.element).toBe(element);
      expect(unhighlightAllAndHighlightSingleMessage.elementType).toBe(elementType);
    });

    it("should handle invalid elementType", () => {
      // Prepare the test data
      const element = { /* mock element object */ };
      const elementTypeName = "";
      const elementType = null;

      // Create the unhighlight all and highlight single message
      const unhighlightAllAndHighlightSingleMessage = new UnhighlightAllAndHighlightSingleMessage(
        element as any,
        elementTypeName as any,
        elementType as any,
      );

      // Perform assertions on the message properties
      expect(unhighlightAllAndHighlightSingleMessage.action).toBe("unhighlightAllAndHighlightSingle");
      expect(unhighlightAllAndHighlightSingleMessage.element).toBe(element);
      expect(unhighlightAllAndHighlightSingleMessage.elementType).toBeNull();
    });
  });

  describe("HighlightAllMessage", () => {
    it("should create a highlight all message", () => {
      // Prepare the test data
      const type = "someElementType";
      const isHighlighted = true;

      // Create the highlight all message
      const highlightAllMessage = new HighlightAllMessage(type as any, isHighlighted);

      // Perform assertions on the message properties
      expect(highlightAllMessage.action).toBe("highlightAllElements");
      expect(highlightAllMessage.type).toBe(type);
      expect(highlightAllMessage.isHighlighted).toBe(isHighlighted);
    });

    it("should handle invalid type", () => {
      // Prepare the test data
      const type = undefined;
      const isHighlighted = true;

      // Create the highlight all message
      const highlightAllMessage = new HighlightAllMessage(type as any, isHighlighted);

      // Perform assertions on the message properties
      expect(highlightAllMessage.action).toBe("highlightAllElements");
      expect(highlightAllMessage.type).toBeUndefined();
      expect(highlightAllMessage.isHighlighted).toBe(isHighlighted);
    });
  });

  describe("ScanPageMessage", () => {
    it("should create a scan page message", () => {
      // Create the scan page message
      const scanPageMessage = new ScanPageMessage();

      // Perform assertions on the message properties
      expect(scanPageMessage.action).toBe("scanPage");
    });
  });
});