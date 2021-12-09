package com.springboot.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.api.model.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
	
//	 public Member findByEmailAddress(String pEmailAddress);

}
