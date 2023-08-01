import React, { useContext, useEffect, useState, useRef } from "react";
import { CollapsibleItemElementInterface, CollapsibleItemTypeInterface, ElementObject, ElementResult } from "./interfaces";
import { ToggleButton, RadioButtonGroup } from "./buttons";
import { MessageSender } from "../messageObjects/messageSender";
import { ElementAttributes } from "./elementAttributes";
import { MyContext } from "./resultItemsContext";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IsCheckedStatus from "./isCheckedStatus";
import { successToast } from "./toastUtils";
import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from "@mui/material";

const messageSender = new MessageSender();


export const CollapsibleItemType: React.FC<CollapsibleItemTypeInterface> = ({ type, url }) => {
  const [currentHighlighted, setCurrentHighlighted] = useState<ElementObject | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAllHighlighted, setIsAllHighlighted] = useState(false);
  const [textareaValues, setTextareaValues] = useState<string[]>(type.nodes.map(node => node.result.kommentar || ""));
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

  const updateJson = (elementObject: ElementObject, index: number, side: string) => {
    let newNodes = [...type.nodes];  // copy the array
    newNodes[index] = elementObject;  // replace the element
    newNodes[index].result.side = side;
    setTypeElements(newNodes);  // update the state
    let elementResults: ElementResult[] = newNodes.map(node => node.result).flat();
    setElementResults(elementResults);
  };

  const storeText = (index: number, newText: string) => {
    type.nodes[index].result.kommentar = newText;
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
    let utfall = "";

    if (option === "Ja") {
      utfall =
        "Knapp er kopla til ein ledetekst i koden. Ledeteksten identifiserer knappen.";
    } else if (option === "Nei") {
      utfall =
        "Knapp er kopla til ein ledetekst i koden. Ledeteksten identifiserer ikkje knappen.";
    } else if (option === "Ikkje forekomst") {
      utfall = "Ikkje ein knapp.";
    }

    type.nodes[index].result.samsvar = option;
    type.nodes[index].result.utfall = utfall;
    updateJson(type.nodes[index], index, url);
  };

  const openCommentSection = (currentIndex: number) => {
    type.nodes[currentIndex].isCommentVisible = true;
  };

  return (
      <div>
        <Accordion id={"collapsible-level-1"}
                   TransitionProps={{ unmountOnExit: false,
                     timeout: { enter: 200, exit: 100 } }}
        >

          <AccordionSummary
              expandIcon={ <ExpandLessIcon /> }
          >
            <Grid container>
              <Grid item xs={4}>
                <div className={"big-font"}> {type.name}</div>
              </Grid>
              <Grid item xs={4}>
                <div className={"big-font"}> {type.nodes.length} </div>
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
                    element={item.element}
                    selector={item.selector}
                    result={item.result}
                    isCommentVisible={false} />

                  <RadioButtonGroup onOptionChange={(value) => {
                    handleOptionChange(value, index);
                    openCommentSection(index);
                  }} presetOption={type.nodes[index].result.samsvar} index={index} />

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
  setIsExpanded(thisElement === highlightedElement);
}, [highlightedElement, thisElement]);

const toggleCheck = () => {
  if (isExpanded) {
    // If the clicked element is already expanded, unhighlight it
    setIsExpanded(false);
    setHighlightedElement(null);
    if (!isAllHighlighted) {
      messageSender.highlightSingleMessage(thisElement, true);
    }
  } else {
    // Unhighlight all elements, if all are highlighted
    if (isAllHighlighted) {
      setIsAllHighlighted(false);
      messageSender.unhighlightAllAndHighlightSingleMessage(thisElement, type);
    } else if (highlightedElement) { 
      messageSender.highlightAndRemovePreviousMessage(thisElement, highlightedElement);
    } else {
      messageSender.highlightSingleMessage(thisElement, false);
    }
    // Highlight the clicked element and expand it
    setIsExpanded(true);
    setHighlightedElement(thisElement);
    
  }
};

return (
  <div data-testid="collapsible-type">
    <Accordion
      id={"collapsible-level-2"}
      TransitionProps={{ unmountOnExit: true,
        timeout: {
        enter: 200,
          exit: 190 } }}
      expanded={isExpanded}
    >
      <AccordionSummary expandIcon={<ExpandLessIcon />} onClick={toggleCheck}>
        <Grid container>
          <Grid item xs={8}>
            [{thisElement.title}]
          </Grid>
          <Grid item xs={4}>
            <IsCheckedStatus text={thisElement.result.samsvar}></IsCheckedStatus>
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
