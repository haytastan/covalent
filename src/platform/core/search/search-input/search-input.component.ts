import {
  Component,
  ViewChild,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Optional,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  forwardRef,
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Dir } from '@angular/cdk/bidi';
import { MatInput } from '@angular/material/input';
import { MatFormFieldAppearance } from '@angular/material/form-field';

import { debounceTime, skip } from 'rxjs/operators';

import { IControlValueAccessor, mixinControlValueAccessor } from '@covalent/core/common';

export class TdSearchInputBase {
  constructor(public _changeDetectorRef: ChangeDetectorRef) {}
}

/* tslint:disable-next-line */
export const _TdSearchInputMixinBase = mixinControlValueAccessor(TdSearchInputBase);

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TdSearchInputComponent),
      multi: true,
    },
  ],
  selector: 'td-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['value'],
  animations: [
    trigger('searchState', [
      state(
        'hide-left',
        style({
          transform: 'translateX(-150%)',
          display: 'none',
        }),
      ),
      state(
        'hide-right',
        style({
          transform: 'translateX(150%)',
          display: 'none',
        }),
      ),
      state(
        'show',
        style({
          transform: 'translateX(0%)',
          display: 'block',
        }),
      ),
      transition('* => show', animate('200ms ease-in')),
      transition('show => *', animate('200ms ease-out')),
    ]),
  ],
})
export class TdSearchInputComponent extends _TdSearchInputMixinBase implements IControlValueAccessor, OnInit {
  @ViewChild(MatInput, { static: true }) _input: MatInput;

  /**
   * appearance?: MatFormFieldAppearance
   * Appearance style for the underlying input component.
   */
  @Input('appearance') appearance: MatFormFieldAppearance;

  /**
   * showUnderline?: boolean
   * Sets if the input underline should be visible. Defaults to 'false'.
   */
  @Input('showUnderline') showUnderline: boolean = false;

  /**
   * debounce?: number
   * Debounce timeout between keypresses. Defaults to 400.
   */
  @Input('debounce') debounce: number = 400;

  /**
   * placeholder?: string
   * Placeholder for the underlying input component.
   */
  @Input('placeholder') placeholder: string;

  /**
   * clearIcon?: string
   * The icon used to clear the search input.
   * Defaults to 'cancel' icon.
   */
  @Input('clearIcon') clearIcon: string = 'cancel';

  /**
   * searchDebounce: function($event)
   * Event emitted after the [debounce] timeout.
   */
  @Output('searchDebounce') onSearchDebounce: EventEmitter<string> = new EventEmitter<string>();

  /**
   * search: function($event)
   * Event emitted after the key enter has been pressed.
   */
  @Output('search') onSearch: EventEmitter<string> = new EventEmitter<string>();

  /**
   * clear: function()
   * Event emitted after the clear icon has been clicked.
   */
  @Output('clear') onClear: EventEmitter<void> = new EventEmitter<void>();

  /**
   * blur: function()
   * Event emitted after the blur event has been called in underlying input.
   */
  @Output('blur') onBlur: EventEmitter<void> = new EventEmitter<void>();

  get isRTL(): boolean {
    if (this._dir) {
      return this._dir.dir === 'rtl';
    }
    return false;
  }

  constructor(@Optional() private _dir: Dir, _changeDetectorRef: ChangeDetectorRef) {
    super(_changeDetectorRef);
  }

  ngOnInit(): void {
    this._input.ngControl.valueChanges
      .pipe(
        debounceTime(this.debounce),
        skip(1), // skip first change when value is set to undefined
      )
      .subscribe((value: string) => {
        this._searchTermChanged(value);
      });
  }

  /**
   * Method to focus to underlying input.
   */
  focus(): void {
    this._input.focus();
  }

  handleBlur(): void {
    this.onBlur.emit(undefined);
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  handleSearch(event: Event): void {
    this.stopPropagation(event);
    this.onSearch.emit(this.value);
  }

  /**
   * Method to clear the underlying input.
   */
  clearSearch(): void {
    this.value = '';
    this._changeDetectorRef.markForCheck();
    this.onClear.emit(undefined);
  }

  private _searchTermChanged(value: string): void {
    this.onSearchDebounce.emit(value);
  }
}
