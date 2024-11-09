// FormPresenter.ts
import { View } from "./MainPresenter";
import { EventEmitter } from "../base/events";
import { ensureElement } from "../../utils/utils";

interface FormDeclare {
    valid: boolean;
    errors: string[];
}

export class FormPresenter<T extends FormDeclare> extends View<T> {
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;

    constructor(events: EventEmitter, protected container: HTMLFormElement) {
        super(events, container);
        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('input', this.handleInput.bind(this));
        this.container.addEventListener('submit', this.handleSubmit.bind(this));
    }

    private handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        const field = target.name as keyof T;
        const value = target.value;
        this.onInputChange(field, value);
    }

    private handleSubmit(e: Event) {
        e.preventDefault();
        this.events.emit(`${this.container.name}:submit`);
    }

    protected onInputChange(field: keyof T, value: string) {
        this.events.emit(`${this.container.name}.${String(field)}:change`, {
            field,
            value,
        });
    }

    set valid(value: boolean) {
        this._submit.disabled = !value;
    }

    set errors(value: string) {
        this.setText(this._errors, value);
    }

    render(state: Partial<T> & Pick<FormDeclare, 'valid' | 'errors'>) {
        const { valid, errors, ...inputs } = state;
        super.render({ valid, errors } as T);
        Object.assign(this, inputs);
        return this.container;
    }
}
