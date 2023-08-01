import React from "react";
import { ToggleButton } from "./buttons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CollapsibleTypeInterface } from "../../../interfaces/collapsibleTypeInterfaces";
import { CollapsibleObjectContainer } from "../../containers/collapsibleObjectContainer";
import {Accordion, AccordionDetails, AccordionSummary, Grid} from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

//export const CollapsibleType: React.FC<CollapsibleTypeInterface> = ({
  export const CollapsibleType: React.FC<CollapsibleTypeInterface & { computedProperties: JSON | null }> = ({
    // isExpanded,
    // setIsExpanded,
    elementType,
    isAllHighlighted,
    setIsAllHighlighted,
    currentHighlighted,
    setCurrentHighlighted,
    commentBoxValue,
    setCommentBoxValue,
    typingTimeoutRef,
    url,
    typeElements,
    setTypeElements,
    setJsonData,
    handleHighlightAll,
    computedProperties,
 }) => {

  return (
    <div>
      <Accordion id={"collapsible-level-1"}>
          <AccordionSummary
              expandIcon={ <ExpandLessIcon /> }
          >
            <Grid container>
              <Grid item xs={4}>
                <div className={"big-font"}> {elementType.name}</div>
              </Grid>
              <Grid item xs={4}>
                <div className={"big-font"}> {elementType.nodes.length} </div>
              </Grid>
              <Grid item xs={4}>
                <div className="float-right">
                  <ToggleButton isChecked={isAllHighlighted} onToggle={handleHighlightAll} text="Highlight All" />
                </div>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>

            {elementType.nodes.map((elementObject, index) => {
              return (
                <CollapsibleObjectContainer
                  elementType={elementType}
                  index={index}
                  thisElement={elementObject}
                  highlightedElement={currentHighlighted}
                  setHighlightedElement={setCurrentHighlighted}
                  isAllHighlighted={isAllHighlighted}
                  setIsAllHighlighted={setIsAllHighlighted}
                  commentBoxValue={commentBoxValue}
                  setCommentBoxValue={setCommentBoxValue}
                  typingTimeoutRef={typingTimeoutRef}
                  url={url}
                  typeElements={typeElements}
                  setTypeElements={setTypeElements}
                  setJsonData={setJsonData}
                  computedProperties={computedProperties}
                >
                </CollapsibleObjectContainer>
              );
            })}
            <ToastContainer />
          </AccordionDetails>
        </Accordion>
    </div>
  );
};