package com.ofss.main.repository;

import com.ofss.main.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	@Modifying
	@Query("UPDATE Login l SET l.loginStatus = ?2 WHERE l.loginId = ?1")
	void updateLoginStatus(int loginId, String loginStatus);

}
