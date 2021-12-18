package com.springboot.api.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.api.model.Member;
import com.springboot.api.model.MembershipType;
import com.springboot.api.repository.MembershipTypeRepository;
import com.springboot.api.service.MembershipTypeService;

@Service
public class MembershipTypeServiceImpl implements MembershipTypeService {

	@Autowired
	MembershipTypeRepository membershipTypeRepository;

	@Override
	public List<MembershipType> findAll() {
		return membershipTypeRepository.findAll();
	}
	
	@Override
	public MembershipType findByMembershipId(int pMembershipId) {
		return membershipTypeRepository.findByMembershipId(pMembershipId);
	}

}
