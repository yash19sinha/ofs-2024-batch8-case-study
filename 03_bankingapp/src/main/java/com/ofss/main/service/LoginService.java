package com.ofss.main.service;

import com.ofss.main.domain.Login;
import com.ofss.main.domain.Customer;

public interface LoginService {

    Login login(int loginId, String password);

    boolean createNewCustomer(Customer customer);

    // Other service methods as needed

}
