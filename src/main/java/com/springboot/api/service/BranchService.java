package com.springboot.api.service;

import java.util.List;

import com.springboot.api.model.Branchmaster;

public interface BranchService {
	
	public Branchmaster saveBranch(Branchmaster pBranchmaster);
	
	public List<Branchmaster> findAll();
	
	public Branchmaster findByBranchId(int pBranchId);
}
