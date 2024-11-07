import { bem, ensureElement } from "../../utils/utils";
import ProductModel from "../models/ProductModel";
import { IEvents, EventEmitter } from "../base/events";

interface CardActions {
    onClick: (event: MouseEvent) => void;
}

export class ProductCard {
    protected titleElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected priceElement: HTMLElement;
    protected categoryElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;
    protected descriptionElement?: HTMLElement;
    protected container: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement, actions?: CardActions) {
        this.events = new EventEmitter();

        this.container = container;

        this.titleElement = ensureElement<HTMLElement>('.card_title', container);
        this.priceElement = ensureElement<HTMLElement>('.card_price', container);
        this.categoryElement = ensureElement<HTMLElement>('.card_category', container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.card_button', container);
        this.imageElement = ensureElement<HTMLImageElement>('.card_image', container);
        this.descriptionElement = container.querySelector('.card_description') as HTMLElement;

        this.initializeEventListeners(actions);
    }

    private initializeEventListeners(actions?: CardActions): void {
        if (actions?.onClick) {
            this.events.on('product:click', actions.onClick);
            this.buttonElement.addEventListener('click', (event) => {
                this.events.emit('product:click', event);
            });
        }

        this.container.addEventListener('click', (event: MouseEvent) => {
            if (event.target !== this.buttonElement) {
                this.events.emit('product:click', event);
            }
        });
    }

    private toggleClass(className: string): void {
        this.container.classList.toggle(className);
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    get title(): string {
        return this.titleElement.textContent || '';
    }

    set title(value: string) {
        this.updateElementText(this.titleElement, value);
    }

    set price(value: number) {
        this.updateElementText(this.priceElement, `${value} символьный`);
        this.buttonElement.disabled = value <= 0;
    }

    set category(value: string) {
        this.updateElementText(this.categoryElement, value);
    }

    set image(value: string) {
        this.updateImageSrc(this.imageElement, value, this.title);
    }

    set description(value: string) {
        if (this.descriptionElement) {
            this.updateElementText(this.descriptionElement, value);
        }
    }

    set button(value: string) {
        this.updateElementText(this.buttonElement, value);
    }

    private updateElementText(element: HTMLElement | null, value: string): void {
        if (element) {
            element.textContent = value;
        }
    }

    private updateImageSrc(image: HTMLImageElement, src: string, altText: string): void {
        image.src = src;
        image.alt = altText;
    }
}