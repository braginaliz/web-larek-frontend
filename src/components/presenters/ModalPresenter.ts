import { View } from "./MainPresenter";
import { EventEmitter } from "../../components/base/events";
import { ensureElement } from "../../utils/utils";

interface FormState {
    valid: boolean;
    errors: string[];
}

export class Form<T> extends View<FormState> {
    private submitButton: HTMLButtonElement;
    private errorDisplay: HTMLElement;

    constructor(events: EventEmitter, private formContainer: HTMLFormElement) {
        super(events, formContainer);

        this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.formContainer);
        this.errorDisplay = ensureElement<HTMLElement>('.form_errors', this.formContainer);

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.formContainer.addEventListener('input', this.handleInputChange.bind(this));
        this.formContainer.addEventListener('submit', this.handleSubmit.bind(this));
    }

    private handleInputChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        const fieldName = target.name as keyof T;
        const fieldValue = target.value;

        this.emitFieldChange(fieldName, fieldValue);
    }

    private handleSubmit(event: Event): void {
        event.preventDefault();
        this.events.emit(`${this.formContainer.name}:submit`);
    }

    private emitFieldChange(field: keyof T, value: string): void {
        this.events.emit(`${this.formContainer.name}.${String(field)}:change`, { field, value });
    }

    set valid(state: boolean) {
        this.submitButton.disabled = !state;
    }

    set errors(errorMessages: string[]) {
        this.updateErrorDisplay(errorMessages);
    }

    private updateErrorDisplay(errors: string[]): void {
        if (errors.length > 0) {
            this.errorDisplay.innerHTML = errors.join('<br/>');  
        } else {
            this.errorDisplay.innerHTML = '';  
        }
    }

    render(state: Partial<T> & FormState): HTMLElement {
        const { valid, errors, ...inputValues } = state;

        super.render({ valid, errors: errors ? errors : [] }); 
        Object.assign(this, inputValues);

        return this.formContainer;
    }
}