package com.springboot.api.service;

import java.util.List;

import com.springboot.api.model.Branchmaster;

public interface BranchService {
	
	public void saveBranch(Branchmaster pBranchmaster);
	
	public List<Branchmaster> findAll();
	
	 
}
