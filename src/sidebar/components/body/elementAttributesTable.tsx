// import React, { useEffect, useState } from 'react';
// import { ElementAttribute, ElementObject } from '../../../interfaces/elementInterfaces';

// //export const ElementAttributesTable: React.FC<ElementObject> = ({ attributes }) => {
//     export const ElementAttributesTable: React.FC<ElementObject & { computedProperties: JSON | null }> = ({ attributes, computedProperties }) => {
//     // Define your desired attribute names
//     const attributeNames = ["aria-labelledby", "aria-label", "label", "Contents", "title", "Role"];
//     const initialAttributes: ElementAttribute[] = attributeNames.map(name => ({ name, value: '' }));
//     const [attributess, setAttributes] = useState<ElementAttribute[]>(initialAttributes);

//     useEffect(() => {
//         const newAttributes = attributess.map(attr => {
//             const match = attributes.find(item => item.name === attr.name);
//             return match ? match : attr;
//         });
//         setAttributes(newAttributes);
//     }, [attributes]);

//     useEffect(() => {
//         if (computedProperties !== null) {
//             console.log("Computed properties: ", computedProperties);
//         }
//     }, [computedProperties]);

//     //Table created by ElementObject to display attributes
//     return (
//         <table>
//             <thead>
//                 <tr>
//                     <th className="tableHead attribute">Attribute</th>
//                     <th className="tableHead value">Value</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     // map over the attributess
//                     attributess.map((item, index) =>
//                         <AttributeField key={index} name={item.name} value={item.value} />
//                     )
//                 }
//             </tbody>
//         </table>
//     );
// };

// export const AttributeField: React.FC<ElementAttribute> = ({ name, value }) => {
//     //Table created by ElementObject to display attributes
//     return (
//         <tr>
//             <td className="tableBody attribute">
//                 {name}
//             </td>
//             <td className="tableBody value">
//                 {value}
//             </td>
//         </tr>
//     );
// };


// import React, { useEffect, useState } from 'react';
// import { ElementAttribute, ElementObject } from '../../../interfaces/elementInterfaces';

// export const ElementAttributesTable: React.FC<ElementObject & { computedProperties: any | null }> = ({ attributes, computedProperties }) => {
//     const attributeNamesDefault = ["aria-labelledby", "aria-label", "label", "Contents", "title", "Role"];
//     const initialAttributes: ElementAttribute[] = attributeNamesDefault.map(name => ({ name, value: '' }));
//     const [attributess, setAttributes] = useState<ElementAttribute[]>(initialAttributes);

//     useEffect(() => {
//         setAttributes((prevAttributes) => {
//             const newAttributes = prevAttributes.map(attr => {
//                 const match = attributes.find(item => item.name === attr.name);
//                 return match ? match : attr;
//             });
//             return newAttributes;
//         });
//     }, [attributes]);

//     useEffect(() => {
//         if (Array.isArray(computedProperties) && computedProperties[0] && computedProperties[0].name && computedProperties[0].name.sources) {
//             const attributeNamesComputed = computedProperties.map((property: any, index: number) => {
//                 switch (index) {
//                     case 0: return property.name.sources[0]?.attribute || '';
//                     case 1: return property.name.sources[1]?.attribute || '';
//                     case 2: return property.name.sources[2]?.nativeSource || '';
//                     case 3: return property.name.sources[3]?.superseded || '';
//                     case 4: return property.name.sources[4]?.attribute || '';
//                     case 5: return property.role || '';
//                     default: return '';
//                 }
//             }).filter((attr: string) => attr !== '');

//             setAttributes((prevAttributes) => {
//                 const combinedAttributes = [...prevAttributes];
//                 for (let name of attributeNamesComputed) {
//                     if (!combinedAttributes.find(attr => attr.name === name)) {
//                         combinedAttributes.push({ name, value: '' });
//                     }
//                 }
//                 const newAttributes = combinedAttributes.map(attr => {
//                     const match = attributes.find(item => item.name === attr.name);
//                     return match ? match : attr;
//                 });
//                 return newAttributes;
//             });
//         }
//     }, [attributes, computedProperties]);

//     return (
//         <table>
//             <thead>
//                 <tr>
//                     <th className="tableHead attribute">Attribute</th>
//                     <th className="tableHead value">Value</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     attributess.map((item, index) =>
//                         <AttributeField key={index} name={item.name} value={item.value} />
//                     )
//                 }
//             </tbody>
//         </table>
//     );
// };

// export const AttributeField: React.FC<ElementAttribute> = ({ name, value }) => {
//     return (
//         <tr>
//             <td className="tableBody attribute">
//                 {name}
//             </td>
//             <td className="tableBody value">
//                 {value}
//             </td>
//         </tr>
//     );
// };



import React, { useEffect, useState } from 'react';
import { ElementAttribute, ElementObject } from '../../../interfaces/elementInterfaces';

export const ElementAttributesTable: React.FC<ElementObject & { computedProperties: any | null }> = ({ attributes, computedProperties }) => {
    const attributeNamesDefault = ["aria-labelledby", "aria-label", "label", "Contents", "title", "Role"];
    const initialAttributes: ElementAttribute[] = attributeNamesDefault.map(name => ({ name, value: '' }));
    const [attributess, setAttributes] = useState<ElementAttribute[]>(initialAttributes);

    useEffect(() => {
        let attributeNamesComputed: string[] = [];
        if (Array.isArray(computedProperties) && computedProperties[0] && computedProperties[0].name && computedProperties[0].name.sources) {
            attributeNamesComputed = computedProperties.map((property: any, index: number) => {
                const { sources = [] } = property.name || {};
            
                switch (index) {
                    case 0: return sources[0]?.attribute || '';
                    case 1: return sources[1]?.attribute || '';
                    case 2: return sources.length > 2 ? sources[2]?.nativeSource || '' : '';
                    case 3: return sources.length > 3 ? sources[3]?.superseded || '' : '';
                    case 4: return sources.length > 4 ? sources[4]?.attribute || '' : '';
                    case 5: return property.role || '';
                    default: return '';
                }
            }).filter((attr: string) => attr !== '');
        }

        const combinedAttributes = [...initialAttributes];
        for (let name of attributeNamesComputed) {
            if (!combinedAttributes.find(attr => attr.name === name)) {
                combinedAttributes.push({ name, value: '' });
            }
        }

        const newAttributes = combinedAttributes.map(attr => {
            const match = attributes.find(item => item.name === attr.name);
            return match ? match : attr;
        });

        setAttributes(newAttributes);
    }, [attributes, computedProperties]);

    return (
        <table>
            <thead>
                <tr>
                    <th className="tableHead attribute">Attribute</th>
                    <th className="tableHead value">Value</th>
                </tr>
            </thead>
            <tbody>
                {
                    attributess.map((item, index) =>
                        <AttributeField key={index} name={item.name} value={item.value} />
                    )
                }
            </tbody>
        </table>
    );
};

export const AttributeField: React.FC<ElementAttribute> = ({ name, value }) => {
    return (
        <tr>
            <td className="tableBody attribute">
                {name}
            </td>
            <td className="tableBody value">
                {value}
            </td>
        </tr>
    );
};

