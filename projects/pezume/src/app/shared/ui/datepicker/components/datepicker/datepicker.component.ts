import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'pez-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {

  dateValue: Date;
  disabled = false;
  @Input() controlName: string;
  @Input() group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  propagateChange = (_: any) => { };
  propagateTouched = (_: any) => { };

  dateChange(value: Date) {
    this.propagateChange(value.getTime());
    this.propagateTouched(true);
  }

  writeValue(obj: number): void {
    this.dateValue = new Date(obj);
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
