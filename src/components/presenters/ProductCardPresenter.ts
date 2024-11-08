// ProductCardPresenter.ts
import { MainPresenter } from "./MainPresenter"; 
import { ProductDetails } from "../../types"; 
import { bem, ensureElement } from "../../utils/utils";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

type CardModifier = 'compact' | 'full';

export class ProductCardPresenter extends MainPresenter<ProductDetails> {
    protected _title: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _price: HTMLElement;
    protected _description?: HTMLElement;
    protected _category?: HTMLElement;
    protected _button?: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) { 
        super(container);

        this._title = ensureElement<HTMLElement>('.card_title', container);
        this._price = ensureElement<HTMLElement>('.card_price', container);
        this._category = container.querySelector<HTMLElement>('.card_category');
        this._button = container.querySelector<HTMLButtonElement>('.card_button'); 
        this._image = container.querySelector<HTMLImageElement>('.card_image'); 
        this._description = container.querySelector<HTMLElement>('.card_description');

        if (actions?.onClick) {
            this._button 
                ? this._button.addEventListener('click', actions.onClick) 
                : container.addEventListener('click', actions.onClick);
        }
    }

    toggle(modifier: CardModifier) {
        this.toggleClass(bem('card', undefined, modifier).name);
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.updateText(this._title, value);
    }

    get title(): string {
        return this._title.textContent ?? '';
    }

    set price(value: number) {
        const priceText = value ? `${value} синaпсов` : 'Бесценно';
        this.updateText(this._price, priceText);
        this.toggleButtonState(value);
    }

    set category(value: string) {
        this.updateText(this._category, value);
    }

    set image(value: string) {
        this.updateImage(this._image, value, this.title);
    }

    set description(value: string) {
        this.updateText(this._description, value);
    }

    set button(value: string) {
        this.updateText(this._button, value);
    }

    private updateText(element?: HTMLElement, text?: string) {
        if (element) {
            element.textContent = text ?? '';
        }
    }

    private toggleButtonState(value: number) {
        if (this._button) {
            this._button.disabled = !value;
        }
    }

    private updateImage(imageElement?: HTMLImageElement, src?: string, alt?: string) {
        if (imageElement) {
            imageElement.src = src ?? '';
            imageElement.alt = alt ?? 'Изображение товара';
        }
    }
}