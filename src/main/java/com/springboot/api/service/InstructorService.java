package com.springboot.api.service;

import java.util.List;

import com.springboot.api.model.Instructor;

public interface InstructorService {

	public void saveInstructor(Instructor pInstructor);

	public List<Instructor> findAll();

	public Instructor findByInstructorId(int pInstructorId);

}
