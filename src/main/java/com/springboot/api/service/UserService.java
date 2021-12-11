package com.springboot.api.service;

import java.util.List;

import com.springboot.api.model.User;

public interface UserService {
	
	public void saveUser(User pUser);
	
	public List<User> findAll();
	
	public User findByUserId(int pUserId);
	
	public void saveUserAsInstructor(User pUser);
	
//	 public Member findByEmailAddress(String pEmailAddress);
	 
}
