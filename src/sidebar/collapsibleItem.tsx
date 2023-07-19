import React, { useContext, useEffect, useState, useRef } from "react";
import { CollapsibleItemElementInterface, CollapsibleItemTypeInterface, ElementObject, ElementResult,ExtendedElementObject  } from "./interfaces";
import {ToggleButton, RadioButtonGroup} from "./buttons";
import { MessageSender } from "../messageObjects/messageSender";
import { ElementAttributes } from "./elementAttributes";
import { MyContext } from "./resultItemsContext";
import { v4 as uuidv4 } from 'uuid';
import {ToastContainer, toast, Flip, Slide, Zoom} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import IsCheckedStatus from "./isCheckedStatus";

const messageSender = new MessageSender();


export const CollapsibleItemType: React.FC<CollapsibleItemTypeInterface> = ({ type, thisElement, parentIndex, url}) => {
    const [currentHighlighted, setCurrentHighlighted] = useState<ElementObject | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAllHighlighted, setIsAllHighlighted] = useState(false);
    const [textareaValues, setTextareaValues] = useState<string[]>(type.nodes.map(node => node.result.comment || ""));
    const [typeElements, setTypeElements] = useState<ElementObject[]>(type.nodes);
    const context = useContext(MyContext);
    const [openCommentIndex, setOpenCommentIndex] = useState<number | null>(null);
    const typingTimeoutRef = useRef<number | null>(null);


    
    if (context === null) {
      // handle the case where the context is null
      return null;
    }
    const { elementResults, setElementResults } = context;
    console.log(elementResults)
  
    const toggleCheck = () => {
        setIsAllHighlighted(!isAllHighlighted);
        console.log("Setter allhighlighted til " + isAllHighlighted);
        console.log("allhightlighted: " + isAllHighlighted);
        setCurrentHighlighted(null);
        highlightAll();
    };

    const updateJson = (elementObject: ElementObject, index: number, url: string) => {
        let newNodes = [...type.nodes];  // copy the array
        newNodes[index] = elementObject;  // replace the element
        newNodes[index].result.url = url;
        setTypeElements(newNodes);  // update the state
        let elementResults : ElementResult[] = newNodes.map(node => node.result).flat();
        setElementResults(elementResults);
    };

    const storeText = (index: number, newText: string) => {
        type.nodes[index].result.comment = newText;
        updateJson(type.nodes[index], index, url);
      };

      const handleTextareaChange = (index: number, newText: string) => {
        setTextareaValues((prevValues) => {
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
          storeText(index, newText);
          toast.success(`'${newText}' lagret `,{
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

    const highlightAll = () => {
        console.log("sending highlightAllMessage")
        messageSender.highlightAllWithType(type, isAllHighlighted);
    };

    const handleOptionChange = (option: string, index: number) => {
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

      type.nodes[index].result.correctText = option;
      type.nodes[index].result.outcome = outcome;
      updateJson(type.nodes[index], index, url);
    };
    
    
    
    const toggleCommentSection = (currentIndex: number) => {
        // Toggle the visibility of the comment-box
        setOpenCommentIndex((currentIndex));
    };

   

    return (
        <div className='collapsible-item'>
            <div className='collapsible-item-parent'>
                <div className={`item-header row ${isExpanded ? 'pressed' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>

                    <div className={"col-4"}>
                        <div className="buttons-text">
                            <br/> {type.name}
                        </div>
                    </div>

                    <div className={"col-4"}>
                        <div className="total-buttons">
                            <br/> {type.nodes.length}
                        </div>
                    </div>

                    <div className={"col-4"}>
                        <div className="float-right">
                            <ToggleButton isChecked={isAllHighlighted} onToggle={toggleCheck} text="Highlight All" />
                        </div>
                    </div>

                </div>
                {isExpanded && (
                    <div className="collapsible-item-children">
                        {type.nodes.map((item, index) => {
                            return (
                                <CollapsibleItemElement
                                    type={type}
                                    key={index}
                                    thisElement={item}
                                    highlightedElement={currentHighlighted}
                                    setHighlightedElement={setCurrentHighlighted}
                                    isAllHighlighted={isAllHighlighted}
                                    setIsAllHighlighted={setIsAllHighlighted} 
                                >
                                    <ElementAttributes
                                        attributes={item.attributes}
                                        title={item.title}
                                        htmlString={item.htmlString}
                                        selector={item.selector}
                                        result={item.result}/>

                                    <RadioButtonGroup onOptionChange={(value) => {
                                        handleOptionChange(value, index);
                                        toggleCommentSection(index);
                                    }} presetOption={type.nodes[index].result.correctText} index={index} />

                                    <div>
                                     {openCommentIndex === index && (
                                            <div className="comment-box">
                                                <textarea
                                                className="textarea"
                                                name="comment"
                                                form="usrform"
                                                value={textareaValues[index]}
                                                onChange={(e) => handleTextareaChange(index, e.target.value)}
                                                onBlur={() => {
                                                  // Execute storeText when the textarea loses focus
                                                  storeText(index, textareaValues[index]);
                                                }}
                                              >
                                                Enter text here...
                                                </textarea>
                                            </div>
                                        )}
                                         
                                    </div>
                                </CollapsibleItemElement>
                            );
                        })}
                        <ToastContainer />
                    </div>
                )}
            </div>
        </div>
    );
};

export const CollapsibleItemElement: React.FC<CollapsibleItemElementInterface> = ({
  type,
  thisElement,
  children,
  highlightedElement,
  isAllHighlighted,
  setHighlightedElement,
  setIsAllHighlighted,
}) => {

  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);


  useEffect(() => {
    setIsHighlighted((thisElement === highlightedElement) || isAllHighlighted);
  }, [highlightedElement, isAllHighlighted]);


  const toggleCheck = () => {
    //If we press the currently highlighted element, unhighlight it
    if (highlightedElement === thisElement) {
      setHighlightedElement(null);
      messageSender.highlightSingleMessage(thisElement, true);
      //} else if (isAllHighlighted && highlightedElement === null) {
    } else if (isAllHighlighted) {
      setIsAllHighlighted(false);
      messageSender.unhighlightAllAndHighlightSingleMessage(thisElement, type);
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

  return (
    <div className="collapsible-item-child">
      <div className="collapsible-item">
        <div className={`item-header ${isExpanded ? 'pressed' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
          <div className="row">
            <div className="col-4">
               <br/> {thisElement.title}
            </div>
            <div className="col-4">
              <br/>
            <IsCheckedStatus text={thisElement.result.correctText}></IsCheckedStatus>
              </div>
              <div className={"col-4"}>
                  <div className={"float-right"}>
                      <ToggleButton isChecked={isHighlighted || isAllHighlighted} onToggle={toggleCheck} text="Jump to" />
                  </div>
              </div>
          </div>

        </div>
          <div className={"row"}>
              <div className={"col-12"}>
                  <div className="content-data">
                      {isExpanded && children}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );

};
