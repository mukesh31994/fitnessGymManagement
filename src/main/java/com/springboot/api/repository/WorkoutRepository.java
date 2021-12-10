package com.springboot.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.api.model.Workout;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Integer> {

	public Workout findByWorkoutId(int pWorkoutId);

}
