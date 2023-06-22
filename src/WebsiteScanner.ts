class WebsiteScanner{
    public getButtons(): NodeListOf<HTMLButtonElement> {
        return document.querySelectorAll("button, input[type='submit'], input[type='button'], role='button'") as NodeListOf<HTMLButtonElement>;
    }

    
}