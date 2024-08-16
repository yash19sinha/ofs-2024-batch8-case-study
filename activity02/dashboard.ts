/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import * as AccUtils from "../accUtils";
import * as ko from "knockout";
import * as Bootstrap from "ojs/ojbootstrap";
import "oj-c/input-text";
import "oj-c/input-number";
import 'oj-c/input-password';
import "ojs/ojknockout";
import 'ojs/ojdatetimepicker';
import Message = require('ojs/ojmessaging');
import { IntlConverterUtils } from 'ojs/ojconverterutils-i18n';
import { ojDatePicker } from 'ojs/ojdatetimepicker';
import 'ojs/ojknockout';
import 'ojs/ojdatetimepicker';
import 'ojs/ojlabel';
import 'ojs/ojformlayout';
import 'oj-c/form-layout'
import 'oj-c/radioset';
import 'ojs/ojswitch';

type DataType = {
  value: string;
  label: string;
};
  
type RadiosetArrayDataItem = {
  value: string;
  label: string;
  assistiveText?: string;
  helpSourceLink?: string;
  helpSourceText?: string;
};

const maxColumnsItems: RadiosetArrayDataItem[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' }
];

class DashboardViewModel {

  value: ko.Observable<string>;
  firstName : ko.Observable<string> | ko.Observable<any>;
  salary : ko.Observable<number> | ko.Observable<any>;
  password : ko.Observable<string> | ko.Observable<any>;

  
    maxColumnsString: ko.Observable<string>;
    
    maxColumnsOptions: ko.ObservableArray<RadiosetArrayDataItem>;
    numberOfMonths: number;
    datePickerMonths: ojDatePicker['datePicker'];
    datePickerWeek: ojDatePicker['datePicker'];
    largeScreenMatch: MediaQueryList | undefined;
    maxColumns: ko.Computed<number>;
    isContrastBackground: ko.Observable<boolean>;
  

      

    
  constructor() {

    this.firstName = ko.observable(null);
    this.salary = ko.observable(null);
    this.password = ko.observable(null);
    this.value = ko.observable(IntlConverterUtils.dateToLocalIsoDateString(new Date()));
    this.maxColumnsString = ko.observable('1');
    this.maxColumns = ko.computed(() => {
      return parseInt(this.maxColumnsString());
    });
    
    this.maxColumnsOptions = ko.observableArray(maxColumnsItems);
    this.isContrastBackground = ko.observable(false);

    this.numberOfMonths = 12;
    this.datePickerMonths = {
      numberOfMonths: this.numberOfMonths
    };

    this.datePickerWeek = {
      weekDisplay: 'number'
    };

  
    this.isContrastBackground.subscribe(function (newValue) {
      // div for legacy components
      let darkContainer = document.getElementById('dark-container');
      // div for corepack components
      const corepackDarkContainer = document.getElementById('oj-c-dark-container');
      if (darkContainer != null) {
        if (newValue) {
          darkContainer.className = 'oj-panel oj-bg-neutral-170 oj-color-invert';
          // corepackDarkContainer.className =
          //   'oj-panel oj-bg-neutral-170 oj-color-invert oj-c-colorscheme-dependent';
        } else {
          darkContainer.className = 'oj-panel';
          // corepackDarkContainer.className = 'oj-panel';
        }
      }
    });

  }

}
// Bootstrap.whenDocumentReady().then(() => {
//   ko.applyBindings(new DashboardViewModel(), document.getElementById("div1"));
// });

export = DashboardViewModel;
