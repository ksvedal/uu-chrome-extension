import React from 'react';

interface Props {
  text: string;
}

export const RadioButtonStatus: React.FC<Props> = ({ text }) => {
  return (
    <div className={`${(text === "Yes") ? 'yesColor' : (text === "No") ? "noColor": (text === "The element is not a button") ? "notButtonColor": ""}`}>
        {text}
    </div>
  );
};