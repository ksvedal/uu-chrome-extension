import { ElementObject, ElementType } from "../sidebar/interfaces";

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

export class HighlightAllMessage implements Message {
    constructor(public type: ElementType, public isChecked: boolean){
        this.type = type;
        this.isChecked = isChecked;
    }
    action: string = "highlightAllElements";
}

export class ScanPageMessage implements Message {
    action: string = "scanPage";
}