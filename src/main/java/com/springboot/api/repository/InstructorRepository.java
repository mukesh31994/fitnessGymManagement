package com.springboot.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.api.model.Instructor;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Integer> {

	public Instructor findByInstructorId(int pInstructorId);
	
}
