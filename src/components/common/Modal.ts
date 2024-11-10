import { View } from "../base/MainComponent";
import { ensureElement } from "../../utils/utils";
import { IEvents} from '../base/events';

interface InterModalData {
    content: HTMLElement;
}

export class Modal extends View<InterModalData> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(events: IEvents, container: HTMLElement) {
        super(events, container);
        this._closeButton = ensureElement<HTMLButtonElement>('.modal_close', container);
        this._content = ensureElement<HTMLElement>('.modal_content', container);

        this._closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close() {
        this.container.classList.remove('modal_active');
        this.content = null;
        this.events.emit('modal:close');
    }

    render(data: InterModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}