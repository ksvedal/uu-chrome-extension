import { ElementObject, ElementType } from "../../interfaces/elementInterfaces";
import { MessageSender } from "../../messageObjects/messageSender";

const messageSender = new MessageSender();

export const highlightElement = (
    highlightedElement: ElementObject | null,
    thisElement: ElementObject,
    setHighlightedElement: React.Dispatch<React.SetStateAction<ElementObject | null>>,
    isAllHighlighted: boolean,
    setIsAllHighlighted: React.Dispatch<React.SetStateAction<boolean>>,
    elementType: ElementType,
) => {
    //If we press the currently highlighted element, unhighlight it
    if (highlightedElement === thisElement) {
      setHighlightedElement(null);
      messageSender.highlightSingleMessage(thisElement, true);
      //} else if (isAllHighlighted && highlightedElement === null) {
    } else if (isAllHighlighted) {
      setIsAllHighlighted(false);
      messageSender.unhighlightAllAndHighlightSingleMessage(thisElement, elementType);
      //unhighlightAllAndHighligthSingle( );
      setHighlightedElement(thisElement);
    } else if (highlightedElement) {
      //Another element is highlighted, unhighlight it and highlight the new one
      messageSender.highlightAndRemovePreviousMessage(thisElement, highlightedElement);
      setHighlightedElement(thisElement);//Kan kanskje fjerne denne
    } else {
      //No element is highlighted, highlight the new one
      setHighlightedElement(thisElement);
      messageSender.highlightSingleMessage(thisElement, false);
    }
  };