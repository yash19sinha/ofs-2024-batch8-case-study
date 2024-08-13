package com.ofss.main.service;

import com.ofss.main.domain.Customer;
import com.ofss.main.domain.Login;
import com.ofss.main.repository.CustomerRepository;
import com.ofss.main.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private CustomerRepository customerRepository;

    private static final int MAX_LOGIN_ATTEMPTS = 3;

    @Override
    public Login login(int loginId, String password) {
        // Retrieve the Login entity using the provided loginId
        Login login = loginRepository.findById(loginId).orElse(null);
        
        if (login != null) {
            // Check if the account is locked
            if ("LOCKED".equals(login.getLoginStatus())) {
                throw new RuntimeException("Account is locked due to multiple failed login attempts.");
            }

            // Check if the provided password matches the stored password
            if (login.getPassword().equals(password)) {
                // Password matches, reset the login attempts and return the login details
                login.setLoginAttempts(0);
                loginRepository.save(login);
                return login;
            } else {
                // Password does not match, increment the login attempts
                int attempts = login.getLoginAttempts() + 1;
                login.setLoginAttempts(attempts);

                // Lock the account if maximum attempts exceeded
                if (attempts >= MAX_LOGIN_ATTEMPTS) {
                    login.setLoginStatus("LOCKED");
                }

                loginRepository.save(login);

                throw new RuntimeException("Invalid password. Attempt " + attempts + " of " + MAX_LOGIN_ATTEMPTS);
            }
        } else {
            // Login does not exist
            throw new RuntimeException("Login ID does not exist");
        }
    }

    @Override
    public boolean createNewCustomer(Customer customer) {
        // Ensure customer status is valid before saving
        if (!"NEW".equals(customer.getCustomerStatus()) && !"APPROVED".equals(customer.getCustomerStatus())) {
            throw new IllegalArgumentException("Invalid customer status");
        }
        
        // Ensure the customer has a valid email address before saving
        if (customer.getEmail() == null || customer.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Customer email cannot be null or empty");
        }

        Customer savedCustomer = customerRepository.save(customer);
        return savedCustomer != null;
    }
}
