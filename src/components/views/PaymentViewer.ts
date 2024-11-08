import { FormPresenter } from "../presenters/FormPresenter";
import { OrderInput, PaymentTypes } from "../../types";
import { EventEmitter } from "../base/events";
import { ensureElement } from "../../utils/utils";

export class PaymentViewer extends FormPresenter<OrderInput> {
    protected _paymentCard: HTMLButtonElement;
    protected _paymentCash: HTMLButtonElement;

    constructor(events: EventEmitter, container: HTMLFormElement) {
        super(events, container);
        this._paymentCard = ensureElement<HTMLButtonElement>('.button_alt[name=card]', this.container);
        this._paymentCash = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', this.container);

        this._paymentCard.addEventListener('click', () => {
            this.payment = 'card';
            this.onInputChange('payment', 'card');
        });

        this._paymentCash.addEventListener('click', () => {
            this.payment = 'cash';
            this.onInputChange('payment', 'cash');
        });
    }

    set payment(value: PaymentTypes) {
        this._paymentCard.classList.toggle('button_alt-active', value === 'card');
        this._paymentCash.classList.toggle('button_alt-active', value === 'cash');
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}