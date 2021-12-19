package com.springboot.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.api.model.Branchmaster;
import com.springboot.api.model.Member;

@Repository
public interface BranchRepository extends JpaRepository<Branchmaster, Integer> {
	
	 public Branchmaster findByBranchId(int pbranchId);
}
