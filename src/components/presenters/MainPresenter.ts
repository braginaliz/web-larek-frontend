import { IEvents } from "../base/events";

export class MainPresenter<T> {
    constructor(protected readonly container: HTMLElement) {}

    toggleClass(className: string): void {
        this.container.classList.toggle(className);
    }

    protected setText(element: HTMLElement, value: unknown): void {
        if (element) {
            element.textContent = String(value);
        }
    }

    protected setImage(element: HTMLImageElement, src: string, alt?: string): void {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    render(data?: T): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}

export class View<T> extends MainPresenter<T> {
    constructor(protected readonly events: IEvents, container: HTMLElement) {
        super(container);
    }
    updateBasketCount(count: number): void {
        const basketCounter = this.container.querySelector('.header__basket-counter');
        if (basketCounter) {
            this.setText(basketCounter as HTMLElement, count);
        }
    }
    showOrderSuccess(amount: number): void {
        const successTemplate = document.getElementById('success')?.innerHTML;
        if (successTemplate) {
            const successElement = document.createElement('div');
            successElement.innerHTML = successTemplate;
            this.setText(successElement.querySelector('.order-success__description') as HTMLElement, `Списано ${amount} синапсов`);
            this.container.appendChild(successElement);
        }
    }
}