import { View } from "../presenters/MainPresenter";
import { ensureElement, cloneTemplate, createElement } from "../../utils/utils";
import { EventEmitter } from "../base/events";

interface BasketViewerInter {
    items: HTMLElement[];
    total: number;
}

export class BasketViewer extends View<BasketViewerInter> {
    static template = ensureElement<HTMLTemplateElement>('#basket');

    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(events: EventEmitter) {
        super(events, cloneTemplate(BasketViewer.template));
        
        this._list = ensureElement<HTMLElement>('.basket_list', this.container);
        this._total = ensureElement<HTMLElement>('.basket_price', this.container);
        this._button = ensureElement<HTMLElement>('.basket_button', this.container);

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
                textContent: 'Корзина пуста'
            }));
            this._button.setAttribute('disabled', 'disabled');
        }
    }
}