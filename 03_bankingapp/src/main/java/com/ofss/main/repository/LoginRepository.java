package com.ofss.main.repository;

import com.ofss.main.domain.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LoginRepository extends JpaRepository<Login, Integer> {

    @Query("SELECT l FROM Login l WHERE l.loginId = :loginId AND l.password = :password")
    Login findByLoginIdAndPassword(@Param("loginId") int loginId, @Param("password") String password);
//    Login findByLoginId(int loginId);

}
