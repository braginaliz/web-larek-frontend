import { MainComponent } from "../base/MainComponent";
import { ensureElement } from "../../utils/utils";

interface InterSuccess {
    total: number;
}

interface InterSuccessActions {
    onClick: () => void;
}

export class Success extends MainComponent<InterSuccess> {
    protected _total: HTMLElement;
    protected _close: HTMLElement;

    constructor(container: HTMLElement, actions: InterSuccessActions) {
        super(container);

        this._total = ensureElement<HTMLElement>('.order-success__description', this.container);
        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);

        if (actions.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }

    set total(value: number) {
        this.setText(this._total, `Списано ${value} синосов`);
    }
}