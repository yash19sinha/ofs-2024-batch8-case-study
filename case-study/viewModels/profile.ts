import * as AccUtils from "../accUtils";
import * as ko from "knockout";
import 'oj-c/form-layout';
import "oj-c/input-text";
import "oj-c/input-number";
import "oj-c/button";
import "ojs/ojswitch"

class ProfileViewModel {
    // Define observables for customer details
    customerId = ko.observable<number | null>(null);
    firstName = ko.observable<string | null>(null);
    lastName = ko.observable<string | null>(null);
    gender = ko.observable<string | null>(null);
    mobile = ko.observable<number | null>(null);
    email = ko.observable<string | null>(null);

    // Define observables for login details
    loginId = ko.observable<string | null>(null);
    loginStatus = ko.observable<string | null>(null);
    loginAttempts = ko.observable<number | null>(null);
    password = ko.observable<string | null>(null);

    updateSwitch = ko.observable<boolean>(false);

    restServerUrl: string = "http://localhost:8080/api/getCustomer";
    updateUrl: string = "http://localhost:8080/api/updateCustomer";

    constructor() {
        // Automatically fetch customer details when the ViewModel is initialized
        this.fetchCustomerDetails();
    }
    async fetchCustomerDetails() {
        // Retrieve loginId and password from sessionStorage
        const loginId = sessionStorage.getItem("loginId");
        const password = sessionStorage.getItem("password");
        // Prepare the request payload
        const payload = {
            loginId: loginId,
            password: password
        };
        // Create and send POST request to the server
        const request = new Request(this.restServerUrl, {
            headers: new Headers({
                "Content-type": "application/json; charset=UTF-8",
            }),
            body: JSON.stringify(payload),
            method: "POST",
        });
        try {
            const response = await fetch(request);
            if (response.ok) {
                const data = await response.json();
                // Update observables with the response data
                this.customerId(data.customerId);
                this.firstName(data.firstName);
                this.lastName(data.lastName);
                this.gender(data.gender);
                this.mobile(data.mobile);
                this.email(data.email);
                this.password(data.login.password)
           
           
                // Update login details
                this.loginId(data.login.loginId);
                this.loginStatus(data.login.loginStatus);
                this.loginAttempts(data.login.loginAttempts);
             
            } else {
                console.error("Failed to fetch customer details");
            }
        } catch (error) {
            console.error("An error occurred while fetching customer details:", error);
        }
    }
    updateCustomerDetails = async () => {
        // Create the payload based on current observable values
        const payload = {
            customerId: this.customerId(),
            firstName: this.firstName(),
            lastName: this.lastName(),
            gender: this.gender(),
            mobile: this.mobile(),
            email: this.email(),

            login: {
                loginId: this.loginId(),
                password: this.password(), // Assuming password can also be updated
                loginAttempts: this.loginAttempts(),
                loginStatus: this.loginStatus(),

            }
        };
        // Create and send request to REST service to update customer details
        const request = new Request("http://localhost:8080/api/updateCustomer", {
            headers: new Headers({
                "Content-type": "application/json; charset=UTF-8",
            }),
            body: JSON.stringify(payload),
            method: "PUT",
        });
        try {
            const response = await fetch(request);
            if (response.ok) {
                // If update is successful
                alert('Customer details updated successfully!');
            } else if (response.status === 400) {
                // Handle validation errors or bad request
                alert('Invalid input. Please check the provided details.');
            } else if (response.status === 404) {
                // Handle case where customer ID is not found
                alert('Customer ID not found. Please try again.');
            } else {
                // Handle other possible errors
                alert('Failed to update customer details. Please try again later.');
            }
        } catch (error) {
            // Handle network or other errors
            alert('An error occurred while processing your request. Please try again later.');
        }
    };


}
export = ProfileViewModel;