export abstract class ElementSelector {
    abstract selector: string;
    getElements(): NodeListOf<HTMLElement> {
        return document.querySelectorAll(this.selector) as NodeListOf<HTMLElement>;
    }
}

//Example of a buttons selector that doesnt overlap with menu items
 export class ButtonSelector extends ElementSelector {
    selector = "button:not([role='menuitem']):not([role='menuitemcheckbox']):not([role='menuitemradio']), input[type='submit']:not([role='menuitem']):not([role='menuitemcheckbox']):not([role='menuitemradio']), input[type='button']:not([role='menuitem']):not([role='menuitemcheckbox']):not([role='menuitemradio']), [role='button']:not([role='menuitem']):not([role='menuitemcheckbox']):not([role='menuitemradio'])";
}
 
export class ImageSelector extends ElementSelector {
    selector = "img:not([role='button'])";
}

export class LinkSelector extends ElementSelector {
    selector = "a:not([role='button'])";
}

 export class MenuItems extends ElementSelector {
    selector = "[role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio']";
}
 
export class Headings extends ElementSelector {
    selector = "h1, h2, h3, h4, h5, h6"
}
