import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CollapsibleArrowButton, RegularButton, ToggleButton } from '../../sidebar/components/body/buttons'; 
import { RadioButtons } from '../../sidebar/components/body/radioButtons';

// ------------------------- ToggleButton component -------------------------------------
test('ToggleButton renders correctly', () => {
    const { getByText } = render(<ToggleButton isChecked={false} onToggle={() => {}} text="Click Me" />);
    const buttonElement = getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('toggle-button float-right');
  });

test('ToggleButton calls onToggle when clicked and updates className', () => {
// Initialize states
var isChecked = false;
const onToggle = () => {
    isChecked = !isChecked;
};

// Render the component 
const { getByText, rerender } = render(
    <ToggleButton isChecked={isChecked} onToggle={onToggle} text="Click Me" />
);
const buttonElement = getByText('Click Me');
// Assert that the button is rendered with the correct className
expect(buttonElement).not.toHaveClass('pressed');
// Click the button to update the 'isChecked' state
fireEvent.click(buttonElement);

// Rerender the component to initialize with the updated state of 'IsChecked'
rerender(<ToggleButton isChecked={isChecked} onToggle={onToggle} text="Click" />)

expect(isChecked).toBe(true);
expect(buttonElement).toHaveClass('pressed');
});


// ------------------------- RegualarButton component -------------------------------------
test('RegularButton calls onClick when clicked', () => {
    let clicked = false;
    const onClick = () => {
      clicked = true;
    };
  
    const { getByText } = render(
      <RegularButton onClick={onClick} text="Click Me" />
    );
    const buttonElement = getByText('Click Me');
  
    expect(clicked).toBe(false);
  
    fireEvent.click(buttonElement);
  
    expect(clicked).toBe(true);
  });


  // ------------------------- CollapsibleArrowButton component -------------------------------------
  test('CollapsibleArrowButton displays the correct arrow icon', () => {
    const { getByText, rerender } = render(
      <CollapsibleArrowButton isExpanded={false} />
    );
    const arrowElement = getByText('▲');
  
    expect(arrowElement).toBeInTheDocument();
    expect(arrowElement).not.toHaveClass('pressed');
  
    rerender(<CollapsibleArrowButton isExpanded={true} />);
  
    expect(arrowElement).toHaveClass('pressed');
  });


// ------------------------- RadioButtonGroup component -------------------------------------
test('RadioButtonGroup selects the correct option and calls onOptionChange', () => {
    let selectedOption = 'Yes';
    const mockOnOptionChange = jest.fn((option) => {
      selectedOption = option;
    });
  
    const { getByLabelText } = render(
      <RadioButtons
        onOptionChange={mockOnOptionChange}
        index={0}
        presetOption={selectedOption}
      />
    );
  
    const yesRadioButton = getByLabelText('Yes');
    const noRadioButton = getByLabelText('No');
    const notAButtonRadioButton = getByLabelText('Not a button');
  
    expect(yesRadioButton).toBeChecked();
    expect(noRadioButton).not.toBeChecked();
    expect(notAButtonRadioButton).not.toBeChecked();
  
    fireEvent.click(noRadioButton);
  
    expect(mockOnOptionChange).toHaveBeenCalledTimes(1);
    expect(selectedOption).toBe('No');
    expect(noRadioButton).toBeChecked();
  
    fireEvent.click(notAButtonRadioButton);
  
    expect(mockOnOptionChange).toHaveBeenCalledTimes(2);
    expect(selectedOption).toBe('The element is not a button');
    expect(notAButtonRadioButton).toBeChecked();
  });