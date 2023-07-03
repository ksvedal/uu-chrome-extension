import React from 'react';
import TabIcon from './tabIcon';
import { ResultsHeaderInterface } from './interfaces';

//TODO: Replace any with correct type
const ResultsHeader: React.FC<ResultsHeaderInterface> = ({url, isScanned, openInNewTab}) => {
  if(!isScanned){
    return null;
  }
  
  return (
    <div className='headline'>
    <TabIcon></TabIcon>
    <p>Website: {url} </p>
    <button className='headline-button' onClick={openInNewTab}>
      View in table
    </button>
    </div>
  );
};

export default ResultsHeader;