package com.springboot.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.api.model.MembershipType;

@Repository
public interface MembershipTypeRepository extends JpaRepository<MembershipType, Integer> {

	
}
