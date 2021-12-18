package com.springboot.api.service;

import java.util.List;

import com.springboot.api.model.Member;

public interface MemberService {
	
	public Member saveMember(Member pMember);
	
	public List<Member> findAll();
	
	public Member findByMemberId(int pMemberId);
	
//	 public Member findByEmailAddress(String pEmailAddress);
	 
}
