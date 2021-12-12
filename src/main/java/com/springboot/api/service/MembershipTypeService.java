package com.springboot.api.service;

import java.util.List;

import com.springboot.api.model.MembershipType;

public interface MembershipTypeService {
	
	public List<MembershipType> findAll();
	 
}
