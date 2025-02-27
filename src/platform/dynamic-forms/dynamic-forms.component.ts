import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ContentChildren,
  TemplateRef,
  QueryList,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { TdDynamicFormsService, ITdDynamicElementConfig } from './services/dynamic-forms.service';
import { TdDynamicFormsErrorTemplate } from './dynamic-element.component';

import { timer, Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'td-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TdDynamicFormsComponent implements AfterContentInit, OnDestroy {
  private _renderedElements: ITdDynamicElementConfig[] = [];
  private _elements: ITdDynamicElementConfig[];
  private _templateMap: Map<string, TemplateRef<any>> = new Map<string, TemplateRef<any>>();
  private _destroy$: Subject<any> = new Subject();
  private _destroyControl$: Subject<string> = new Subject();

  @ContentChildren(TdDynamicFormsErrorTemplate) _errorTemplates: QueryList<TdDynamicFormsErrorTemplate>;
  dynamicForm: FormGroup;

  /**
   * elements: ITdDynamicElementConfig[]
   * JS Object that will render the elements depending on its config.
   * [name] property is required.
   */
  @Input('elements')
  set elements(elements: ITdDynamicElementConfig[]) {
    if (elements) {
      this._elements = elements;
    } else {
      this._elements = [];
    }
    this._rerenderElements();
  }
  get elements(): ITdDynamicElementConfig[] {
    return this._renderedElements;
  }

  /**
   * Getter property for dynamic [FormGroup].
   */
  get form(): FormGroup {
    return this.dynamicForm;
  }

  /**
   * Getter property for [valid] of dynamic [FormGroup].
   */
  get valid(): boolean {
    if (this.dynamicForm) {
      return this.dynamicForm.valid;
    }
    return false;
  }

  /**
   * Getter property for [value] of dynamic [FormGroup].
   */
  get value(): any {
    if (this.dynamicForm) {
      return this.dynamicForm.value;
    }
    return {};
  }

  /**
   * Getter property for [errors] of dynamic [FormGroup].
   */
  get errors(): { [name: string]: any } {
    if (this.dynamicForm) {
      let errors: { [name: string]: any } = {};
      for (let name in this.dynamicForm.controls) {
        errors[name] = this.dynamicForm.controls[name].errors;
      }
      return errors;
    }
    return {};
  }

  /**
   * Getter property for [controls] of dynamic [FormGroup].
   */
  get controls(): { [key: string]: AbstractControl } {
    if (this.dynamicForm) {
      return this.dynamicForm.controls;
    }
    return {};
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _dynamicFormsService: TdDynamicFormsService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    this.dynamicForm = this._formBuilder.group({});
  }

  ngAfterContentInit(): void {
    this._updateErrorTemplates();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroyControl$.complete();
  }

  /**
   * Refreshes the form and rerenders all validator/element modifications.
   */
  refresh(): void {
    this._rerenderElements();
    this._updateErrorTemplates();
  }

  /**
   * Getter method for error template references
   */
  getErrorTemplateRef(name: string): TemplateRef<any> {
    return this._templateMap.get(name);
  }

  /**
   * Loads error templates and sets them in a map for faster access.
   */
  private _updateErrorTemplates(): void {
    this._templateMap = new Map<string, TemplateRef<any>>();
    for (let i: number = 0; i < this._errorTemplates.toArray().length; i++) {
      this._templateMap.set(
        this._errorTemplates.toArray()[i].tdDynamicFormsError,
        this._errorTemplates.toArray()[i].templateRef,
      );
    }
  }

  private _rerenderElements(): void {
    this._clearRemovedElements();
    this._renderedElements = [];
    let duplicates: string[] = [];
    this._elements.forEach((elem: ITdDynamicElementConfig) => {
      this._dynamicFormsService.validateDynamicElementName(elem.name);
      if (duplicates.indexOf(elem.name) > -1) {
        throw new Error(`Dynamic element name: "${elem.name}" is duplicated`);
      }
      duplicates.push(elem.name);
      let dynamicElement: AbstractControl = this.dynamicForm.get(elem.name);
      if (!dynamicElement) {
        this.dynamicForm.addControl(elem.name, this._dynamicFormsService.createFormControl(elem));
        this._subscribeToControlStatusChanges(elem.name);
      } else {
        dynamicElement.setValue(elem.default);
        dynamicElement.markAsPristine();
        dynamicElement.markAsUntouched();
        if (elem.disabled) {
          dynamicElement.disable();
        } else {
          dynamicElement.enable();
        }
        dynamicElement.setValidators(this._dynamicFormsService.createValidators(elem));
      }
      // copy objects so they are only changes when calling this method
      this._renderedElements.push(Object.assign({}, elem));
    });
    // call a change detection since the whole form might change
    this._changeDetectorRef.detectChanges();
    timer()
      .toPromise()
      .then(() => {
        // call a markForCheck so elements are rendered correctly in OnPush
        this._changeDetectorRef.markForCheck();
      });
  }

  private _clearRemovedElements(): void {
    for (let i: number = 0; i < this._renderedElements.length; i++) {
      for (let j: number = 0; j < this._elements.length; j++) {
        // check if the name of the element is still there removed
        if (this._renderedElements[i].name === this._elements[j].name) {
          delete this._renderedElements[i];
          break;
        }
      }
    }
    // remove elements that were removed from the array
    this._renderedElements.forEach((elem: ITdDynamicElementConfig) => {
      this._destroyControl$.next(elem.name);
      this.dynamicForm.removeControl(elem.name);
    });
  }

  // Updates component when manually adding errors to controls
  private _subscribeToControlStatusChanges(elementName: string): void {
    const control: AbstractControl = this.controls[elementName];

    const controlDestroyed$: Observable<any> = this._destroyControl$.pipe(
      filter((destroyedElementName: string) => destroyedElementName === elementName),
    );

    control.statusChanges
      .pipe(
        takeUntil(this._destroy$),
        takeUntil(controlDestroyed$),
      )
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
  }
}
