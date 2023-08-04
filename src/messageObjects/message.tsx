import { ElementObject, ElementType } from "../sidebar/interfaces";

export interface Message {
    action: string;
}

export class HighlightMessage implements Message {
    constructor(public element: ElementObject, public elementTypeName: string, public isChecked: boolean) {
        this.element = element;
        this.elementTypeName = elementTypeName;
        this.isChecked = isChecked;
    }
    action: string = "highlightElement";
}

export class HighlightAndRemovePreviousMessage implements Message {
    constructor(public newElement: ElementObject, public previousElement: ElementObject, public typeNameOfElements: string) {
        this.newElement = newElement;
        this.typeNameOfElements = typeNameOfElements;
        this.previousElement = previousElement;
    }
    action: string = "highlightAndRemovePrevious";
}

export class UnhighlightAllAndHighlightSingleMessage implements Message {
    constructor(public element: ElementObject, public elementTypeName: string, public elementType: ElementType) {
        this.element = element;
        this.elementTypeName = elementTypeName;
        this.elementType = elementType;
    }
    action: string = "unhighlightAllAndHighlightSingle";
}

export class HighlightAllMessage implements Message {
    constructor(public type: ElementType, public isHighlighted: boolean, public hasDashedHighlighting?: boolean) {
        this.hasDashedHighlighting = hasDashedHighlighting ?? false;
        this.type = type;
        this.isHighlighted = isHighlighted;
    }
    action: string = "highlightAllElements";
}

export class ScanPageMessage implements Message {
    action: string = "scanPage";
}