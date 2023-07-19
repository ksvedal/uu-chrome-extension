import React from 'react';

interface Props {
  text: string;
}

const IsCheckedStatus: React.FC<Props> = ({ text }) => {
  return (
    <div className={`${(text === "Yes") ? 'yesColor' : (text === "No") ? "noColor": (text === "The element is not a button") ? "notButtonColor": ""}`}>
        {text}
    </div>
  );
};

export default IsCheckedStatus;