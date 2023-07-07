import React from 'react';
import TabIcon from './tabIcon';
import { ResultsHeaderInterface } from './interfaces';

const ResultsHeader: React.FC<ResultsHeaderInterface> = ({url, isScanned}) => {
  if(!isScanned){
    return null;
  }
  
  return (
    <div className='headline'>
      <TabIcon></TabIcon>
      <p>Website: {url} </p>
    </div>
  );
};

export default ResultsHeader;