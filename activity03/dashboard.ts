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
import "oj-c/button";
import "ojs/ojprogress-bar";
import "ojs/ojcheckboxset";




  
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

  id : ko.Observable<number> | ko.Observable<any>;
  value: ko.Observable<string>;
  firstName : ko.Observable<string> | ko.Observable<any>;
  username : ko.Observable<string> | ko.Observable<any>;
  salary : ko.Observable<number> | ko.Observable<any>;
  password : ko.Observable<string> | ko.Observable<any>;
  address : ko.Observable<string> | ko.Observable<any>;
  email : ko.Observable<string> | ko.Observable<any>;

  
  
    maxColumnsString: ko.Observable<string>;
    
    maxColumnsOptions: ko.ObservableArray<RadiosetArrayDataItem>;
    numberOfMonths: number;
    datePickerMonths: ojDatePicker['datePicker'];
    datePickerWeek: ojDatePicker['datePicker'];
    largeScreenMatch: MediaQueryList | undefined;
    maxColumns: ko.Computed<number>;
    isContrastBackground: ko.Observable<boolean>;

    readonly progressValue = ko.observable();
    readonly indeterminate = ko.observableArray();


  

      

    
  constructor() {

    this.id = ko.observable(null);
    this.firstName = ko.observable(null);
    this.username = ko.observable(null);
    this.salary = ko.observable(null);
    this.password = ko.observable(null);
    this.address = ko.observable(null);
    this.email = ko.observable(null);
    
    

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

  
  // handling the events when button is clicked
  public handleClick = async (event : Event) =>{
    let elementName = (event.currentTarget as HTMLElement).tagName;
    //send request to the REST APIS
    alert("You clicked on a button "+ elementName)
    alert("Name= " + this.firstName()+ " Salary= "+ this.salary())
    let id = parseInt(this.id());
    let URL = "https://jsonplaceholder.typicode.com/users/"+id;
    let res = await fetch(URL);
    let jsonData = await res.json();
    console.log(jsonData);

    this.firstName(jsonData.name);
    this.address(jsonData.address.street + ", " + jsonData.address.suite + ", " +  jsonData.address.city + ", " + jsonData.address.zipcode)
    this.email(jsonData.email);
    this.username(jsonData.username);

    let suite = jsonData.address.suite;
    console.log(this.firstName, suite);
    
  
  }
  public fieldProgress = (event: Event) => {
    let value = 0;
    value += (this.id() != null) ? 14.285 : 0;
    value += (this.username() != null) ? 14.285 : 0;
    value += (this.firstName() != null) ? 14.285 : 0;
    value += (this.salary() != null) ? 14.285 : 0;
    value += (this.password() != null) ? 14.285 : 0;
    value += (this.address() != null) ? 14.285 : 0;
    value += (this.email() != null) ? 14.285 : 0;
    return value;
  }

}

// Bootstrap.whenDocumentReady().then(() => {
//   ko.applyBindings(
//     new DashboardViewModel(),
//     document.getElementById("progressBarWrapper")
//   );
// });
// Bootstrap.whenDocumentReady().then(() => {
//   ko.applyBindings(new DashboardViewModel(), document.getElementById("div1"));
// });

export = DashboardViewModel;
