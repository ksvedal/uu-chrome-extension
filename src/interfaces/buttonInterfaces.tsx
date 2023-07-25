export interface RadioButtonGroupProps {
    presetOption: string;
    index: number;
    onOptionChange: (option: string, index: number) => void;
  }
  
  export interface ToggleButtonProps {
    isChecked: boolean;
    onToggle: () => void;
    text: string;
  }
  
  export interface RegularButtonProps {
    text: string;
    onClick: () => void;
  }
  
  export interface CollapsibleArrowProps {
    isExpanded: boolean;
  }
  