import React, { useEffect, useState } from 'react';
import { ElementAttribute, ElementObject } from './interfaces';



export const ElementAttributes: React.FC<ElementObject> = ({attributes, htmlString, children}) => {
    const [attributess, setAttributes] = useState<ElementAttribute[]>(attributes);
    const [childAttributes, setChildAttributes] = useState<ElementAttribute[]>([]);



    useEffect(() => {
        setAttributes(attributes);
        if (children) {
            const allChildAttributes = children.flatMap(child => child.attributes);
            setChildAttributes(allChildAttributes);
        }
    }, [attributes, children]);

    
    //Table created by ElementObject to display attributes
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th className="tableHead">Attribute</th>
                        <th className="tableHead">value</th>
                    </tr>
                </thead>
                <tbody>
                    {attributess.map((item, index) =>
                        <AttributeField key={index} name={item.name} value={item.value} />
                    )}
                    
                </tbody>
            </table>
            <p className="htmlText">{htmlString}</p>
            {children && childAttributes.length > 0 && 
            <div>
                <h3>Child Attributes</h3>
                <table>
                    <thead>
                        <tr>
                        <th className="tableHead">Attribute</th>
                            <th className="tableHead">value</th>
                        </tr>
                    </thead>
                    <tbody className="tableBody">
                        {childAttributes.map((item, index) =>
                            <AttributeField key={index} name={item.name} value={item.value} />
                        )}
                    </tbody>
                </table>
            </div>}
        </div>
    );
};


export const AttributeField: React.FC<ElementAttribute> = ({
    name,
    value
}) => {
    //const [object, setObject] = useState<ElementObject>();

    //Table created by ElementObject to display attributes
    return (
        <tr>
            <td className="tableBody">{name}</td>
            <td className="tableBody">{value}</td>
        </tr>
    );
};

