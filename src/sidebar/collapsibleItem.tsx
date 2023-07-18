import React, { useContext, useEffect, useState } from "react";
import { CollapsibleItemElementInterface, CollapsibleItemTypeInterface, ElementObject, ElementResult,ExtendedElementObject  } from "./interfaces";
import {ToggleButton, RadioButtonGroup} from "./buttons";
import { MessageSender } from "../messageObjects/messageSender";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ElementAttributes } from "./elementAttributes";
import { MyContext } from "./resultItemsContext";

const messageSender = new MessageSender();


export const CollapsibleItemType: React.FC<CollapsibleItemTypeInterface> = ({ type, thisElement, index, url}) => {
    const [currentHighlighted, setCurrentHighlighted] = useState<ElementObject | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAllHighlighted, setIsAllHighlighted] = useState(false);
    const [textareaValues, setTextareaValues] = useState<string[]>(type.nodes.map(node => node.result.comment || ""));
    const [typeElements, setTypeElements] = useState<ElementObject[]>(type.nodes);
    const context = useContext(MyContext);
    const [openCommentIndex, setOpenCommentIndex] = useState<number | null>(null);


    
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
        newNodes[index].result.testID = generateTestID(index);
        newNodes[index].result.ChromeVersion = getChromeVersion();
        newNodes[index].result.ChromeExtensionVersion = getChromeExtensionVersion();
        setTypeElements(newNodes);  // update the state
        let elementResults : ElementResult[] = newNodes.map(node => node.result).flat();
        setElementResults(elementResults);
    };

    const storeText = (index: number) => {
        setTypeElements((prevTypeElements) => {
            const newNodes = [...prevTypeElements]; // copy the array
            if (newNodes[index]) {
                newNodes[index].result.comment = textareaValues[index]; // update the comment value
                updateJson(newNodes[index], index, url); // update the JSON with the updated element
            }
            return newNodes; // return the updated array
        });
    };

    const generateTestID = (index: number) => {
      const testIndex = index + 1;
      const paddedIndex = String(testIndex).padStart(5, '0');
      return `Test${paddedIndex}`;
    };

    const getChromeVersion = () => {
      const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9.]+)/);
      return raw ? raw[2] : null;
    };

    const getChromeExtensionVersion = () => {
      const manifest = chrome.runtime.getManifest();
      return manifest.version;
    };
  
      
    const highlightAll = () => {
        messageSender.highlightAllWithType(type, isAllHighlighted);
    };

    // Define the handleOptionChange function
    const handleOptionChange = (option: string) => {
        console.log("Selected option:", option);
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
                            {type.name}
                        </div>
                    </div>

                    <div className={"col-4"}>
                        <div className="total-buttons float-right">
                            <p>{type.nodes.length}</p>
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
                            const testID = generateTestID(index);
                            return (
                                <CollapsibleItemElement
                                    type={type}
                                    key={index}
                                    thisElement={item}
                                    highlightedElement={currentHighlighted}
                                    setHighlightedElement={setCurrentHighlighted}
                                    isAllHighlighted={isAllHighlighted}
                                    setIsAllHighlighted={setIsAllHighlighted}
                                    updateJson={(elementObject, index) => updateJson(elementObject, index, url)}
                                    testID={testID}
                                    index={index}
                                    url={url}
                                >
                                    <ElementAttributes
                                        attributes={item.attributes}
                                        title={item.title}
                                        htmlString={item.htmlString}
                                        selector={item.selector}
                                        result={item.result}
                                        ChromeVersion={item.ChromeVersion}
                                        ChromeExtensionVersion={item.ChromeExtensionVersion}/>

                                    <RadioButtonGroup onOptionChange={(value) => {
                                        handleOptionChange(value);
                                        toggleCommentSection(index);
                                    }} />

                                    <div>
                                     {openCommentIndex === index && (
                                            <div className="comment-box">
                                                <textarea
                                                className="textarea"
                                                name="comment"
                                                form="usrform"
                                                value={textareaValues[index]}
                                                onChange={(e) =>
                                                    
                                                    setTextareaValues((prevValues) => {
                                                    const newValues = [...prevValues];
                                                    newValues[index] = e.target.value;
                                                    return newValues;
                                                    })
                                                }
                                            >
                                                Enter text here...
                                                </textarea>
                                            </div>
                                        )}
                                         
                                    </div>
                                    
                                </CollapsibleItemElement>
                            );
                        })}
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
  updateJson,
  testID,
  index, 
  url,

}) => {

  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);


  useEffect(() => {
    setIsHighlighted((thisElement === highlightedElement) || isAllHighlighted);
  }, [highlightedElement, isAllHighlighted]);

  const handleCheckboxClick = (update: string) => {
    if (update === "issue") {
        thisElement.result.issue = !thisElement.result.issue;
    } else if (update === "checked") {
        thisElement.result.checked = !thisElement.result.checked;
    }
    updateJson(thisElement, index, url);
};

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

  useEffect(() => {
    type.nodes.forEach((node, index) => {
      node.result.testID = testID;
      node.result.ChromeVersion = node.ChromeVersion;
      node.result.ChromeExtensionVersion = node.ChromeExtensionVersion;
      updateJson(node, index, url);
    });
}, [type.nodes, url, testID]);

  return (
    <div className="collapsible-item-child">
      <div className="collapsible-item">
        <div className={`item-header ${isExpanded ? 'pressed' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
          <div className="row">
            <div className="col-3">
                <p> </p> {thisElement.title}
            </div>

              <div className={"col-9"}>
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
