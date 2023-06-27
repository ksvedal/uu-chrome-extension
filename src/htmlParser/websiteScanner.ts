
    public getButtons(): NodeListOf<HTMLElement> {
        return document.querySelectorAll(this.buttonsSelector) as NodeListOf<HTMLElement>;
    }
}