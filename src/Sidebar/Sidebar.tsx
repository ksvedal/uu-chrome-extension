import React from 'react';
import { CollapsibleItemType, CollapsibleItemElement } from './CollapsibleItem';
import { createRoot } from "react-dom/client";
import "../style/Sidebar.css";
import { ElementType, ElementObject } from "./Interfaces";



const Sidebar: React.FC = () => {

 

  //This is just example input, actual functionality will be added later
  const item1: ElementObject = {title: "Klikk meg", html: "en norsk knapp HTML"};
  const item2: ElementObject = {title: "Click meg", html: "en forvirret knapp HTML"};
  const item3: ElementObject = {title: "Lunsj eller?", html: "Ja HTML"};
  const item4: ElementObject = {title: "Submit", html: "grønn HTML"};
  const items = [item1, item2, item3, item4];
  const buttonType: ElementType = {name: "button", nodes: items};
  const header1: ElementObject = {title: "Header 1", html: "HTML for header 1"};
  const header2: ElementObject = {title: "Header 2", html: "HTML for header 2"};
  const header3: ElementObject = {title: "Header 3", html: "HTML for header 3"};
  const header4: ElementObject = {title: "Header 4", html: "HTML for header 4"};
  const headerItems = [header1, header2, header3, header4];
  const headerType: ElementType = {name: "header", nodes: headerItems};
  const scanPage : ElementType[] = [buttonType, headerType];
  


  //This is also just example output, actual functionality will be added later
  //Maybe add one scanPage() function that returns a list of elementTypes
  //I have a dream
  //that one day
  //this will be a real sidebar
  //with real functionality
  //and real code
  //TODO: The scanPage() function that doesnt exist yet should return a list of elementTypes that contains every element of that type, this should then work
  return (
    <div className='App'>
      {/*for each element in ScanPage, creates a collapse menu with other nodes*/}
      {scanPage.map((item, index) => 
      <CollapsibleItemType key={index}
      type={item}>
        {/* For each node in the type, creates another collapse to display the button*/}
        {item.nodes.map((item, index) =>
          <CollapsibleItemElement 
          key={index} 
          object={item}>
            {item.html}
          </CollapsibleItemElement>
        )}
      </CollapsibleItemType>)}
    </div>
  );
}

//export default Sidebar;
const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Sidebar />
  </React.StrictMode>
);