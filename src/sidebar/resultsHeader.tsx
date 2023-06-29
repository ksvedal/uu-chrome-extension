import React from 'react';
import TabIcon from './tabIcon';

//TODO: Replace any with correct type
const ResultsHeader: React.FC<any> = ({url, isScanned, openInNewTab}) => {
  if(!isScanned){
    return null;
  }
  
  return (
    <div style={{ height: '150px', backgroundColor: '#f5f5f5' }}>
        <TabIcon></TabIcon>
        <p>Site: {url} </p>
        <button className='headline-button' onClick={openInNewTab}>
          View in table
        </button>

      </div>
  );
};

export default ResultsHeader;