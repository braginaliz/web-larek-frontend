import {MainComponent} from "./base/MainComponent";
import { InterProduct } from "../types";
import { bem, ensureElement } from "../utils/utils";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

type CardModifier = 'compact' | 'full';

export class ProductCard extends MainComponent<InterProduct> {
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
        this._category = container.querySelector('.card_category');
        this._button = container.querySelector('.card_button');
        this._image = container.querySelector('.card_image');
        this._description = container.querySelector('.card_description');

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
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
        this.setText(this._title, value);
    }
    
    get title(): string {
        return this._title.textContent || '';
    }
    
    set price(value: number) {
        this.setText(this._price, value ? `${value} синопсов` : 'Бесплатно');
        if (this._button) {
            this._button.disabled = !value;
        }
    }
    
    set category(value: string) {
        this.setText(this._category, value);
    }
    
    set image(value: string) {
        this.setImage(this._image, value, this.title);
    }
    
    set description(value: string) {
        this.setText(this._description, value);
    }
    
    set button(value: string) {
        this.setText(this._button, value);
    }
}