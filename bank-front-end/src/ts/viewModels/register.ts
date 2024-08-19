/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import * as AccUtils from "../accUtils";
import * as ko from "knockout";
import { RESTDataProvider } from 'ojs/ojrestdataprovider';
import 'ojs/ojknockout';
import 'ojs/ojtable';
import 'oj-c/form-layout'
import "oj-c/input-text";
import "oj-c/input-number";
import "oj-c/input-password";
import "oj-c/button";



class RegisterViewModel {


  // inputId : ko.Observable<number> | ko.Observable<any>;
  firstName: ko.Observable<string> | ko.Observable<any>;
  lastName: ko.Observable<string> | ko.Observable<any>;
  gender: ko.Observable<string> | ko.Observable<any>;
  email: ko.Observable<string> | ko.Observable<any>;
  mobile: ko.Observable<string> | ko.Observable<any>;
  password: ko.Observable<string> | ko.Observable<any>;
  restServerUrl: string = 'http://localhost:8080/api/customers';

  constructor() {
    this.firstName = ko.observable(null);
    this.lastName = ko.observable(null);
    this.gender = ko.observable(null);
    this.email = ko.observable(null);
    this.mobile = ko.observable(null);
    this.password = ko.observable(null);


  }
  addRow = async () => {
    // Create row object based on form inputs
    const row = {

      firstName: this.firstName(),
      lastName: this.lastName(),
      gender: this.gender(),
      email: this.email(),
      mobile: this.mobile(),
      login: {
        password: this.password()
      },
      customerStatus: 'NEW'
    };
    // Create and send request to REST service to add row
    const request = new Request(this.restServerUrl, {
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
      }),
      body: JSON.stringify(row),
      method: "POST",
    });
    const response = await fetch(request);
    try{

        if (response.ok) {
            const registeredCustomer = await response.json();
            // Successful registration
            alert(`Registration successful! Customer ID: ${registeredCustomer.customerId}`);
          } else if (response.status === 400) {
            // Bad Request (e.g., validation errors)
            alert('Registration failed. Please check your input and try again.');
          } else if (response.status === 409) {
            // Conflict (e.g., email already in use)
            alert('Registration failed. Email is already in use.');
          } else {
            // Other errors
            alert('An unexpected error occurred. Please try again later.');
          }
        
    }
     catch (error) {
      // Network or other errors
      alert('An error occurred while processing your request. Please try again later.');
    }
  };



}

export = RegisterViewModel;