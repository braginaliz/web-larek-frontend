import { View } from "../base/MainComponent";
import { cloneTemplate, createElement, ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/events";

interface InterBasketView {
    items: HTMLElement[];
    total: number;
}

export class ShoppingBasket extends View<InterBasketView> {
    static template = ensureElement<HTMLTemplateElement>('#basket');

    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(events: EventEmitter) {
        super(events, cloneTemplate(ShoppingBasket.template));

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = ensureElement<HTMLElement>('.basket__price', this.container);
        this._button = ensureElement<HTMLElement>('.basket__button', this.container);

        this._button.addEventListener('click', () => {
            events.emit('order:open');
        });

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
            this._button.removeAttribute('disabled');
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста',
            }));
            this._button.setAttribute('disabled', 'disabled');
        }

        this._list.querySelectorAll('.basket__item').forEach((item, index) => {
            const indexElement = item.querySelector('.basket__item-index');
            if (indexElement) {
                indexElement.textContent = (index + 1).toString();
            }
        });
    }

    set total(total: number) {
        this.setText(this._total, `${total} синансов`);
    }
}