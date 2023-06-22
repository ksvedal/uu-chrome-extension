/**
 * Fetches different types of elements from the page
 */
export class WebsiteScanner{
    public getButtons(): NodeListOf<HTMLButtonElement> {
        const buttonsSelector = "button, input[type='submit'], input[type='button'], [role='button']";
        return document.querySelectorAll(buttonsSelector) as NodeListOf<HTMLButtonElement>;
    }
}