package com.springboot.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.api.model.Branchmaster;

@Repository
public interface BranchRepository extends JpaRepository<Branchmaster, Integer> {
	
}
