package com.ofss.main.service;

import com.ofss.main.domain.Customer;
import com.ofss.main.domain.Login;
import com.ofss.main.repository.CustomerRepository;
import com.ofss.main.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private LoginRepository loginRepository;

    @Override
    public Customer addNewCustomer(Customer customer) {
        Login login = customer.getLogin();
        
        // Save the login entity first if it's transient (new)
        if (login != null && login.getLoginId() == 0) {
            login = loginRepository.save(login);
            customer.setLogin(login);
        }

        // Save the customer entity
        return customerRepository.save(customer);
    }




//    @Override
//    public void resetCustomerStatusToActive(int loginId) {
//        Login login = loginRepository.findById(loginId).orElse(null);
//        if (login != null) {
//            login.setLoginStatus("ACTIVE");
//            login.setLoginAttempts(0);
//            loginRepository.save(login);
//        }
//    }
}
