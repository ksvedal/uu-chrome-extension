import React, { useEffect, useState } from 'react';
import { ElementAttribute, ElementObject } from './interfaces';

export const ElementAttributes: React.FC<ElementObject> = ({ attributes, htmlString, }) => {
    const [attributess, setAttributes] = useState<ElementAttribute[]>(attributes);

    useEffect(() => {
        setAttributes(attributes);
    }, [attributes]);

    //Table created by ElementObject to display attributes
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th className="tableHead attribute">Attribute</th>
                        <th className="tableHead value">value</th>
                    </tr>
                </thead>
                <tbody>
                    {attributess.map((item, index) =>
                        <AttributeField key={index} name={item.name} value={item.value} />
                    )}

                </tbody>
            </table>

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
            <td className="tableBody">
                {name}
            </td>
            <td className="tableBody">
                {value}
            </td>
        </tr>
    );
};