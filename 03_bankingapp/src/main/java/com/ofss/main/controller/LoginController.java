package com.ofss.main.controller;

import com.ofss.main.domain.Customer;
import com.ofss.main.domain.Login;
import com.ofss.main.domain.LoginRequest;
import com.ofss.main.service.LoginService;
import com.ofss.main.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow all origins, adjust as needed
@RestController

public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private CustomerService customerService;

    /**
     * Endpoint to log in with loginId and password.
     *
     * @param loginId   the login ID of the user
     * @param password  the password of the user
     * @return ResponseEntity with login details or an error message
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam int loginId, @RequestParam String password) {
        try {
            Login login = loginService.login(loginId, password);
            return ResponseEntity.ok(login);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }
    /**
     * Endpoint to create a new customer.
     *
     * @param customer the customer details
     * @return ResponseEntity with success or failure message
     */
    @PostMapping("/customers")
    public ResponseEntity<?> createCustomer(@RequestBody Customer customer) {
        try {
            Customer createdCustomer = customerService.addNewCustomer(customer);
            if (createdCustomer != null) {
                return ResponseEntity.ok(createdCustomer);
            } else {
                return ResponseEntity.status(400).body("Failed to create customer");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    /**
     * Endpoint to reset customer status to active.
     *
     * @param loginId the login ID associated with the customer
     * @return ResponseEntity with success or failure message
     */
//    @PostMapping("/customers/{loginId}/reset-status")
//    public ResponseEntity<?> resetCustomerStatus(@PathVariable int loginId) {
//        try {
//            customerService.resetCustomerStatusToActive(loginId);
//            return ResponseEntity.ok("Customer status reset to active");
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
//        }
//    }
}
