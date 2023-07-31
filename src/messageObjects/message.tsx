import { ElementObject, ElementType } from "../interfaces/elementInterfaces";

export interface Message {
    action: string;
}

export class HighlightMessage implements Message {
    constructor(public element: ElementObject, public isChecked: boolean) {
        this.element = element;
        this.isChecked = isChecked;
    }
    action: string = "highlightElement";
}

export class HighlightAndRemovePreviousMessage implements Message {
    constructor(public newElement: ElementObject, public previousElement: ElementObject) {
        this.newElement = newElement;
        this.previousElement = previousElement;
    }
    action: string = "highlightAndRemovePrevious";
}

export class UnhighlightAllAndHighlightSingleMessage implements Message {
    constructor(public element: ElementObject, public elementType: ElementType) {
        this.element = element;
        this.elementType = elementType;
    }
    action: string = "unhighlightAllAndHighlightSingle";
}

export class HighlightAllMessage implements Message {
    constructor(public type: ElementType, public isChecked: boolean) {
        this.type = type;
        this.isChecked = isChecked;
    }
    action: string = "highlightAllElements";
}

export class HighlightAllDashedMessage implements Message {
    action: string = "highlightAllElementsDashed";  
}

export class ScanPageMessage implements Message {
    action: string = "scanPage";
}