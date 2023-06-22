class PageInteractor{
    private prevElem: HTMLElement | null = null;

    public highlightElements(color: string, elements: NodeListOf<HTMLElement>): void {
        for(let element of elements){
            element.style.borderColor = color;
        }
    }
    

    public focusAndScroll(target: string){
        let element: HTMLElement = document.querySelector(target) as HTMLElement;
    }
}