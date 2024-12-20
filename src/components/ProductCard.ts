import { MainComponent } from "./base/MainComponent";
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
        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._price = ensureElement<HTMLElement>('.card__price', container);
        this._category = container.querySelector('.card__category');
        this._button = container.querySelector('.card__button');
        this._image = container.querySelector('.card__image');
        this._description = container.querySelector('.card__text');

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    protected categoryColors: Record<string, string> = {
        "софт-скил": 'soft', 
        "другое": 'other', 
        "кнопка": 'button', 
        "хард-скил": 'hard', 
        "дополнительное": 'additional' 
    };

    set category(value: string) { 
        this.setText(this._category, value); 
    
        // Ensure proper class assignment based on the category
        if (this._category) { 
            const categoryClass = this.categoryColors[value] || '';
            this._category.className = `card__category card__category_${categoryClass}`; 
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
        this.setText(this._price, value ? `${value} cинапсов` : 'Бесплатно');
        if (this._button) {
            this._button.disabled = !value;
        }
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