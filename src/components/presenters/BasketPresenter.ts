import { View } from "./MainPresenter";
import { ensureElement, cloneTemplate } from "../../utils/utils";
import { EventEmitter } from "../../components/base/events";

interface BasketView {
    items: HTMLElement[];
    total: number;
}

function createElement<T extends HTMLElement>(tag: string, attributes?: Partial<T>): T {
    const element = document.createElement(tag) as T;
    if (attributes) {
        Object.assign(element, attributes);
    }
    return element;
}

export class Basket extends View<BasketView> {
    static template = ensureElement<HTMLTemplateElement>('#basket');

    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(events: EventEmitter) {
        super(events, cloneTemplate(Basket.template));
        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = ensureElement<HTMLElement>('.basket__price', this.container);
        this._button = ensureElement<HTMLElement>('.basket__button', this.container);
        
        this._button.addEventListener('click', () => {
            events.emit('orderopen');
        });

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
            this._button.removeAttribute('disabled');
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
            this._button.setAttribute('disabled', 'disabled');
        }
    }

    set total(total: number) {
        this.setText(this._total, `${total} синансов`);
    }
}