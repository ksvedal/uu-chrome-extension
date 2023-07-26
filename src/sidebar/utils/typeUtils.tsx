import { ElementObject, ElementType } from "../../interfaces/elementInterfaces";
import { MessageSender } from "../../messageObjects/messageSender";

const messageSender = new MessageSender();

export const resetHighlight = (
    setIsAllHighlighted: React.Dispatch<React.SetStateAction<boolean>>,
    isAllHighlighted: boolean,
    setCurrentHighlighted: React.Dispatch<React.SetStateAction<ElementObject | null>>,
    ) => {
    setIsAllHighlighted(!isAllHighlighted);
    setCurrentHighlighted(null);
};

export const highlightAll = (
  elementType: ElementType,
  isAllHighlighted: boolean,
) => {
  messageSender.highlightAllWithType(elementType, isAllHighlighted);
};