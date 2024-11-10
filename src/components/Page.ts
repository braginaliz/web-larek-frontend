import { MainComponent } from './base/MainComponent';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

interface InterPage {
    counter: number;
    store: HTMLElement[];
  
    // Блокировка прокрутки страницы
    locked: boolean;
  }

export class Page extends MainComponent<InterPage> {
  // Внутренние ссылки на элементы
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

  // Сеттер для карточек товаров на странице
  set store(items: HTMLElement[]) {
    this._storeElement.replaceChildren(...items);
  }

  set locked(value: boolean) {
    this._wrapperElement.classList.toggle('page__wrapper_locked', value);
  }
}