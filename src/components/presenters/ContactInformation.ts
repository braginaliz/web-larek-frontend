
// ContactInformation.ts
import { EventEmitter } from "../base/events";
import { Form } from "./ModalPresenter";
import { OrderDetails } from "../../types";

export class Contacts extends Form<OrderDetails> {
    constructor(events: EventEmitter, container: HTMLFormElement) {
        super(events, container);
    }

    set email(value: string) {
        const emailElement = this.getElement<HTMLInputElement>('email');
        if (emailElement) {
            emailElement.value = value;
        }
    }

    set phone(value: string) {
        const phoneElement = this.getElement<HTMLInputElement>('phone');
        if (phoneElement) {
            phoneElement.value = value;
        }
    }
}


