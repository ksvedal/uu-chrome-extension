import { toast, Slide } from "react-toastify";
import { ElementObject, ElementType } from "../../interfaces/elementInterfaces";
import { MessageSender } from "../../messageObjects/messageSender";
import { JsonDataFormat } from "../../interfaces/resultInterfaces";



const messageSender = new MessageSender();



export const toggleCheck = (
    setIsAllHighlighted: React.Dispatch<React.SetStateAction<boolean>>,
    isAllHighlighted: boolean,
    setCurrentHighlighted: React.Dispatch<React.SetStateAction<ElementObject | null>>,
    elementType: ElementType,
) => {
    setIsAllHighlighted(!isAllHighlighted);
    setCurrentHighlighted(null);
    highlightAll(elementType, isAllHighlighted);
  };

export const updateJson = (
    elementObject: ElementObject,
    index: number,
    url: string,
    typeElements: ElementObject[],
    setTypeElements: React.Dispatch<React.SetStateAction<ElementObject[]>>,
    setJsonData: React.Dispatch<React.SetStateAction<JsonDataFormat[]>>,
) => {
    let newNodes = typeElements;  // copy the array
    newNodes[index] = elementObject;  // replace the element
    newNodes[index].result.url = url;
    setTypeElements(newNodes);  // update the state
    let jsonData: JsonDataFormat[] = newNodes.map(node => node.result).flat();
    setJsonData(jsonData);
  };

export const storeText = (
    index: number,
    newText: string,
    elementType: ElementType,
) => {
    elementType.nodes[index].result.comment = newText;
  };

export const handleTextareaChange = (
    index: number,
    newText: string,
    setCommentBoxValue: React.Dispatch<React.SetStateAction<string[]>>,
    typingTimeoutRef: React.MutableRefObject<number | null>,
    elementType: ElementType,
    elementObject: ElementObject,
    url: string,
    typeElements: ElementObject[],
    setTypeElements: React.Dispatch<React.SetStateAction<ElementObject[]>>,
    setJsonData: React.Dispatch<React.SetStateAction<JsonDataFormat[]>>

) => {
    setCommentBoxValue((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = newText;
      return newValues;
    });

    // Clear the previous timeout, if any
    if (typingTimeoutRef.current !== null) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a new timeout to execute storeText after 2 seconds
    typingTimeoutRef.current = setTimeout(() => {
      storeText(index, newText, elementType);
      updateJson(elementObject, index, url, typeElements, setTypeElements, setJsonData)
      toast.success(`'${newText}' lagret `, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
        closeButton: false,
        transition: Slide,
        toastId: "the-toasht",
        icon: false
      })
    }, 3000) as any; // Cast the setTimeout return value to any
};


export const highlightAll = (
    elementType: ElementType,
    isAllHighlighted: boolean,
) => {
    messageSender.highlightAllWithType(elementType, isAllHighlighted);
};

export const handleOptionChange = (
    option: string,
    index: number,
    url: string,
    elementType: ElementType,
    typeElements: ElementObject[],
    setTypeElements: React.Dispatch<React.SetStateAction<ElementObject[]>>,
    setJsonData: React.Dispatch<React.SetStateAction<JsonDataFormat[]>>,
    ) => {
    let outcome = "";

    if (option === "Yes") {
      outcome =
        "Knapp er kopla til ein ledetekst i koden. Ledeteksten identifiserer knappen.";
    } else if (option === "No") {
      outcome =
        "Knapp er kopla til ein ledetekst i koden. Ledeteksten identifiserer ikkje knappen.";
    } else if (option === "The element is not a button") {
      outcome = "Testelementet er ikkje ein knapp.";
    }

    elementType.nodes[index].result.correctText = option;
    elementType.nodes[index].result.outcome = outcome;
    updateJson(elementType.nodes[index], index, url, typeElements, setTypeElements, setJsonData);
  };

export const openCommentSection = (currentIndex: number, elementType: ElementType) => {
    elementType.nodes[currentIndex].isCommentVisible = true;
  };