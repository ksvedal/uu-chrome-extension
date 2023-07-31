import React from 'react';

interface Props {
  text: string;
}

export const RadioButtonStatus: React.FC<Props> = ({ text }) => {
  return (
    <div className={`${(text === "Ja") ? 'yesColor' : (text === "Nei") ? "noColor": (text === "Elementet er ikkje en knapp") ? "notButtonColor": ""}`}>
        {text}
    </div>
  );
};