package com.springboot.api.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.api.model.Admin;
import com.springboot.api.model.Branchmaster;
import com.springboot.api.repository.AdminRepository;
import com.springboot.api.service.AdminService;
import com.springboot.api.service.BranchService;

@Service
public class BranchmasterServiceImpl implements BranchService {

	@Autowired
	BranchRepository branchRepository;

	@Override
	public void saveBranch(Branchmaster pBranchmaster) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Branchmaster> findAll() {
		// TODO Auto-generated method stub
		return null;
	}



//	@Override
//	public Admin findByAdminId(int pAdminId) {
//		return adminRepository.findByAdminId(pAdminId);
//	}

}
