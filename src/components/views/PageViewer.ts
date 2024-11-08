//PageViewer.ts

import { MainPresenter } from "../presenters/MainPresenter";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";


interface PageViewerInter {

  counter: number;
  store: HTMLElement[];
  locked: boolean;
}


export class PageViewer extends MainPresenter<PageViewerInter> {

  protected _counterElement: HTMLElement;
  protected _storeElement: HTMLElement;
  protected _wrapperElement: HTMLElement;
  protected _basketElement: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._counterElement = ensureElement<HTMLElement>('.header__basket-counter');
    this._storeElement = ensureElement<HTMLElement>('.gallery');
    this._wrapperElement = ensureElement<HTMLElement>('.page__wrapper');
    this._basketElement = ensureElement<HTMLElement>('.header__basket');

    this._basketElement.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  set counter(value: number) {
    this.setText(this._counterElement, String(value));
  }

  set store(items: HTMLElement[]) {
    this._storeElement.replaceChildren(...items);
  }

  set locked(value: boolean) {
    this._wrapperElement.classList.toggle('page__wrapper_locked', value);
  }
}