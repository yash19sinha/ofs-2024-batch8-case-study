/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import * as AccUtils from "../accUtils";
import * as Bootstrap from 'ojs/ojbootstrap';
import * as ko from "knockout";
import { RESTDataProvider } from 'ojs/ojrestdataprovider';
import 'ojs/ojknockout';
import 'ojs/ojtable';
import 'oj-c/form-layout'
import "oj-c/input-text";
import "oj-c/input-number";
import "oj-c/button";

type D = { "id": number; "name": string; "salary": number };
type K = D['id'];






class CustomersViewModel {
  

  dataprovider : RESTDataProvider<K, D>;

  keyAttributes = "id";
  // inputId : ko.Observable<number> | ko.Observable<any>;
  name : ko.Observable<string> | ko.Observable<any>;
  salary : ko.Observable<number> | ko.Observable<any>;


  restServerUrl: string = 'http://localhost:8888/employees';
  

  constructor() {

    // this.inputId = ko.observable(null);
    this.name = ko.observable(null);
    this.salary = ko.observable(null);
      
      this.dataprovider = new RESTDataProvider({
        keyAttributes: this.keyAttributes,
        url: 'http://localhost:8888/employees',
        transforms : {fetchFirst:{
          request: async (options)=>{
            const url = new URL (options.url);
            return new Request(url.href);
          },
          response: async ({body})=>{
            let data = body;
            return {data};
          }
        }}
        
      }) 
  }
  addRow = async () => {
    // Create row object based on form inputs
    const row = {
    
      name: this.name(),
      salary: this.salary(),
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
    const addedRow = await response.json();
  
  };
  // add to the observableArray
  
  // addRow = async () => {
  //   // Create row object based on form inputs
  //   const row = {
  //     id: this.id(),
  //     name: this.name(),
  //     salary: this.salary(),
  //   };

  //   // Create and send request to REST service to add row
  //   const request = new Request(this.restServerUrl, {
  //     headers: new Headers({
  //       "Content-type": "application/json; charset=UTF-8",
  //     }),
  //     body: JSON.stringify(row),
  //     method: "POST",
  //   });

  //   try {
  //     const response = await fetch(request);
  //     const addedRow = await response.json();

  //     // Create add mutate event and call mutate method
  //     // to notify dataprovider consumers that a row has been added
  //     const addedRowIndex = addedRow.index;
  //     delete addedRow.index;
  //     const addedRowKey = addedRow.id;
  //     const addedRowMetaData = { key: addedRowKey };

  //     this.dataprovider.mutate({
  //       add: {
  //         data: [addedRow],
  //         indexes: [addedRowIndex],
  //         keys: new Set([addedRowKey]),
  //         metadata: [addedRowMetaData],
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Failed to add row:', error);
  //   }
  // };

  
}



export = CustomersViewModel;
