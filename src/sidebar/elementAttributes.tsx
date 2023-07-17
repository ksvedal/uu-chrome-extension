import React, { useEffect, useState } from 'react';
import { ElementAttribute, ElementObject } from './interfaces';

export const ElementAttributes: React.FC<ElementObject> = ({ attributes, htmlString, }) => {
    // Define your desired attribute names
    const attributeNames = ["aria-labelledby", "aria-label", "title", "Description", "Role", "Focusable"];

    const initialAttributes: ElementAttribute[] = attributeNames.map(name => ({ name, value: '' }));

    const [attributess, setAttributes] = useState<ElementAttribute[]>(initialAttributes);

    useEffect(() => {
        const newAttributes = attributess.map(attr => {
            const match = attributes.find(item => item.name === attr.name);
            return match ? match : attr;
        });
        setAttributes(newAttributes);
    }, [attributes]);

    //Table created by ElementObject to display attributes
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th className="tableHead attribute">Attribute</th>
                    <th className="tableHead value">Value</th>
                </tr>
                </thead>
                <tbody>
                {
                    // map over the attributess
                    attributess.map((item, index) =>
                        <AttributeField key={index} name={item.name} value={item.value} />
                    )
                }
                </tbody>
            </table>

        </div>
    );
};

export const AttributeField: React.FC<ElementAttribute> = ({ name, value }) => {
    //Table created by ElementObject to display attributes
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
