import React, { useContext, useEffect, useState, useRef } from "react";
import { CollapsibleItemElementInterface, CollapsibleItemTypeInterface, ElementObject, ElementResult, ExtendedElementObject } from "./interfaces";
import { ToggleButton, RadioButtonGroup } from "./buttons";
import { MessageSender } from "../messageObjects/messageSender";
import { ElementAttributes } from "./elementAttributes";
import { MyContext } from "./resultItemsContext";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast, Flip, Slide, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IsCheckedStatus from "./isCheckedStatus";
import { successToast } from "./toastUtils";
import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from "@mui/material";

const messageSender = new MessageSender();


export const CollapsibleItemType: React.FC<CollapsibleItemTypeInterface> = ({ type, thisElement, parentIndex, url }) => {
  const [currentHighlighted, setCurrentHighlighted] = useState<ElementObject | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAllHighlighted, setIsAllHighlighted] = useState(false);
  const [textareaValues, setTextareaValues] = useState<string[]>(type.nodes.map(node => node.result.comment || ""));
  const [typeElements, setTypeElements] = useState<ElementObject[]>(type.nodes);
  const context = useContext(MyContext);
  //const [openCommentIndex, setOpenCommentIndex] = useState<number | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);



  if (context === null) {
    // handle the case where the context is null
    return null;
  }
  const { elementResults, setElementResults } = context;

  const toggleCheck = () => {
    setIsAllHighlighted(!isAllHighlighted);
    setCurrentHighlighted(null);
    highlightAll();
  };

  const updateJson = (elementObject: ElementObject, index: number, url: string) => {
    let newNodes = [...type.nodes];  // copy the array
    newNodes[index] = elementObject;  // replace the element
    newNodes[index].result.url = url;
    setTypeElements(newNodes);  // update the state
    let elementResults: ElementResult[] = newNodes.map(node => node.result).flat();
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
      successToast(`'${newText}' lagret `);
    }, 3000) as any; // Cast the setTimeout return value to any
  };

  const highlightAll = () => {
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

  const openCommentSection = (currentIndex: number) => {
    type.nodes[currentIndex].isCommentVisible = true;
  };

  return (
      <div>
        <Accordion id={"collapsible-level-1"}>
          <AccordionSummary
              expandIcon={ "*" }
          >
            <Grid container>
              <Grid item xs={4}>
                {type.name}
              </Grid>
              <Grid item xs={4}>
                {type.nodes.length}
              </Grid>
              <Grid item xs={4}>
                <div className="float-right">
                  <ToggleButton isChecked={isAllHighlighted} onToggle={toggleCheck} text="Highlight All" />
                </div>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
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
                        result={item.result}
                        isCommentVisible={false} />

                    <RadioButtonGroup onOptionChange={(value) => {
                      handleOptionChange(value, index);
                      openCommentSection(index);
                    }} presetOption={type.nodes[index].result.correctText} index={index} />

                    <div>
                      {type.nodes[index].isCommentVisible && (
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
          </AccordionDetails>
        </Accordion>
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
  setIsHighlighted(thisElement === highlightedElement || isAllHighlighted);
  setIsExpanded(thisElement === highlightedElement);
}, [highlightedElement, isAllHighlighted, thisElement]);

const toggleCheck = () => {
  // If the clicked object is already expanded, collapse it
  if (isExpanded) {
    setIsExpanded(false);
    setIsHighlighted(false);
    setHighlightedElement(null);
    messageSender.highlightSingleMessage(thisElement, true);
  } else {
    // If another item is already expanded, collapse it before expanding the clicked item
    if (highlightedElement) {
      setHighlightedElement(null);
      messageSender.highlightSingleMessage(highlightedElement, true);
    }

    // Expand the clicked element and highlight it
    setIsExpanded(true);
    setIsHighlighted(true);
    setHighlightedElement(thisElement);
    messageSender.highlightSingleMessage(thisElement, false);
  }
};
  return (
      <div data-testid="collapsible-type">
        <Accordion id={"collapsible-level-2"}
            TransitionProps={{ unmountOnExit: true }}
          >
          <AccordionSummary
              expandIcon={ "^" }
              onClick={() => {
                toggleCheck()
              }}
          >
            <Grid container>
              <Grid item xs={8}>
                [{thisElement.title}]
              </Grid>
              <Grid item xs={4}>
                <IsCheckedStatus text={thisElement.result.correctText}></IsCheckedStatus>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                {children}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
  );
};
