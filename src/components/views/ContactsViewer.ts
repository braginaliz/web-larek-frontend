import { FormPresenter } from "../presenters/FormPresenter";
import { OrderInput} from "../../types";


export class ContactsViewer extends FormPresenter<OrderInput> {
    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }
}