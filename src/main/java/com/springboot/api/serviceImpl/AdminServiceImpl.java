package com.springboot.api.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.api.model.Admin;
import com.springboot.api.repository.AdminRepository;
import com.springboot.api.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	AdminRepository adminRepository;

	@Override
	public void saveAdmin(Admin pAdmin) {
		adminRepository.save(pAdmin);
	}

	@Override
	public List<Admin> findAll() {
		return adminRepository.findAll();
	}

//	@Override
//	public Admin findByAdminId(int pAdminId) {
//		return adminRepository.findByAdminId(pAdminId);
//	}

}
