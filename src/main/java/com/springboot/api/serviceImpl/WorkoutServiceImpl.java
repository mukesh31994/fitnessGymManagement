package com.springboot.api.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.api.model.Workout;
import com.springboot.api.repository.WorkoutRepository;
import com.springboot.api.service.WorkoutService;

@Service
public class WorkoutServiceImpl implements WorkoutService {

	@Autowired
	WorkoutRepository workoutRepository;

	@Override
	public void saveWorkout(Workout pWorkout) {
		workoutRepository.save(pWorkout);

	}

	@Override
	public List<Workout> findAll() {
		return workoutRepository.findAll();
	}

	@Override
	public Workout findByWorkoutId(int pWorkoutId) {
		return workoutRepository.findByWorkoutId(pWorkoutId);
	}

}
