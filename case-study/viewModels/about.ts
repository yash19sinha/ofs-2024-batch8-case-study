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

type D = { "loginId": number; "password": string };
type K = D['loginId'];

class AboutViewModel {

  dataprovider: RESTDataProvider<K, D>;
  // inputId : ko.Observable<number> | ko.Observable<any>;
  loginId: ko.Observable<number> | ko.Observable<any>;
  password: ko.Observable<string> | ko.Observable<any>;
  restServerUrl: string = 'http://localhost:8080/api/login';

  constructor() {
    this.loginId = ko.observable(null);
    this.password = ko.observable(null);




    this.dataprovider = new RESTDataProvider({
      keyAttributes: 'loginId',
      url: 'http://localhost:8080/api/login',
      transforms: {
        fetchFirst: {
          request: async (options) => {
            const url = new URL(options.url);
            return new Request(url.href);
          },
          response: async ({ body }) => {
            let data = body;
            return { data };
          }
        }
      }

    })
  }
  addRow = async () => {
    // Create row object based on form inputs
    const row = {

      loginId: this.loginId(),
      password: this.password(),
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
    try {
      // const addedRow = await response.json();
      if (response.ok) {
        // If login is successful
        const addedRow = await response.json();
        alert('Login successful!');
        sessionStorage.setItem('loginId',this.loginId());
        sessionStorage.setItem('password',this.password());
        window.location.href = "/?ojr=profile"
      } else if (response.status === 401) {
        // If login fails (e.g., incorrect password)
        alert(await response.text());
      } else if (response.status === 423) {
        // If login fails (e.g., incorrect password)
        alert("Account Blocked");
      }else {
        // Handle other possible errors
        alert('An unexpected error occurred. Please try again later.');
      }
    } catch (error) {
      // Handle network or other errors
      alert('An error occurred while processing your request. Please try again later.');
    }

  };



}

export = AboutViewModel;