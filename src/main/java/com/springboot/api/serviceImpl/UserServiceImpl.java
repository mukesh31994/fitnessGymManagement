package com.springboot.api.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.api.model.Admin;
import com.springboot.api.model.Instructor;
import com.springboot.api.model.User;
import com.springboot.api.repository.AdminRepository;
import com.springboot.api.repository.InstructorRepository;
import com.springboot.api.repository.UserRepository;
import com.springboot.api.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	AdminRepository adminRepository;
	
	@Autowired
	InstructorRepository instructorRepository;

	@Override
	public void saveUser(User pUser) {
		User lUser = userRepository.save(pUser);
		Admin lAdmin = new Admin();
		lAdmin.setUserId(lUser.getUserId());
		lAdmin.setAddress(lUser.getAddress());
		lAdmin.setAdminName(lUser.getUsername());
		lAdmin.setEmail(lUser.getEmail());
		lAdmin.setContact(lUser.getContact());
		adminRepository.save(lAdmin);
	}
	
	@Override
	public void saveUserAsInstructor(User pUser) {
		User lUser = userRepository.save(pUser);
		Instructor lInstructor = new Instructor();
		lInstructor.setUserId(lUser.getUserId());
		lInstructor.setAddress(lUser.getAddress());
		lInstructor.setInstructorName(lUser.getUsername());
		lInstructor.setEmail(lUser.getEmail());
		lInstructor.setContact(lUser.getContact());
		instructorRepository.save(lInstructor);
	}

	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public User findByUserId(int pUserId) {
		return userRepository.findByUserId(pUserId);
	}

}
