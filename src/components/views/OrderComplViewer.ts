//OrderComplViewerюеы

import { MainPresenter } from "../presenters/MainPresenter";
import { ensureElement } from "../../utils/utils";

interface Complited {
    total: number;
}

interface OrderComplited {
    onClick: () => void;
}

export class OrderComplViewer extends MainPresenter<Complited> {
    protected _total: HTMLElement;
    protected _close: HTMLElement;

    constructor(container: HTMLElement, actions: OrderComplited) {
        super(container);
        
        this._total = ensureElement<HTMLElement>('.order-success_description', this.container);
        this._close = ensureElement<HTMLElement>('.order-success_close', this.container);

        if (actions.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }

    set total(value: number) {
        this.setText(this._total, `Списано ${value} симансов`);
    }
}