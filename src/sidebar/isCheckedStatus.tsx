import React from 'react';

interface Props {
  text: string;
}

const IsCheckedStatus: React.FC<Props> = ({ text }) => {
  return (
    <div className={`${(text === "Ja") ? 'yesColor' : (text === "Nei") ? "noColor": (text === "Ikkje ein knapp") ? "notButtonColor": ""}`}>
        {text}
    </div>
  );
};

export default IsCheckedStatus;