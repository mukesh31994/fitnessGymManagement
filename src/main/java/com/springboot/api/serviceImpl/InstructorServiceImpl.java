package com.springboot.api.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.api.model.Instructor;
import com.springboot.api.repository.InstructorRepository;
import com.springboot.api.service.InstructorService;

@Service
public class InstructorServiceImpl implements InstructorService {

	@Autowired
	InstructorRepository instructorRepository;

	@Override
	public void saveInstructor(Instructor pInstructor) {
		instructorRepository.save(pInstructor);

	}

	@Override
	public List<Instructor> findAll() {
		return instructorRepository.findAll();
	}

	@Override
	public Instructor findByInstructorId(int pInstructorId) {
		return instructorRepository.findByInstructorId(pInstructorId);
	}

}
