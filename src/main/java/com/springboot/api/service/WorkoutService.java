package com.springboot.api.service;

import java.util.List;

import com.springboot.api.model.Workout;

public interface WorkoutService {

	public void saveWorkout(Workout pWorkout);

	public List<Workout> findAll();

	public Workout findByWorkoutId(int pWorkoutId);

}
