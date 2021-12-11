package com.springboot.api.service;

import java.util.List;

import com.springboot.api.model.Admin;

public interface AdminService {
	
	public void saveAdmin(Admin pAdmin);
	
	public List<Admin> findAll();
	
//	public Admin findByAdminId(int pMemberId);
	
	 
}
