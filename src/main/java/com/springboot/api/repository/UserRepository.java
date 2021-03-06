package com.springboot.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.api.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	 Optional<User> findByUsername(String userName);
	 
	 public User findByUserId(int pUserId);
	 
//	 public User findByUsername(String pUsername);
	 
}
