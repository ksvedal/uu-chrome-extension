import React from "react";
import { ToggleButton } from "./buttons";
import { RadioButtonStatus } from "./radioButtonStatus";
import { CollapsibleObjectInterface } from "../../../interfaces/collapsibleObjectInterfaces";
import { Accordion, AccordionSummary, Grid, AccordionDetails } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';



export const CollapsibleObject: React.FC<CollapsibleObjectInterface> = ({
    isExpanded,
    setIsExpanded,
    isHighlighted,
    thisElement,
    children,
    isAllHighlighted,
    handleHighlightElement
  }) => {
  
    return (
      <div data-testid="collapsible-type">
      <Accordion id={"collapsible-level-2"}
          TransitionProps={{ unmountOnExit: true }}
        >
        <AccordionSummary
            expandIcon={<ExpandLessIcon />}
            onClick={() => {
              handleHighlightElement()
            }}
        >
          <Grid container>
            <Grid item xs={8}>
              [{thisElement.title}]
            </Grid>
            <Grid item xs={4}>
              <RadioButtonStatus text={thisElement.result.samsvar}></RadioButtonStatus>
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