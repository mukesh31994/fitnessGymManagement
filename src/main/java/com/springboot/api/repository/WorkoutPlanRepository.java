package com.springboot.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.api.model.WorkoutPlan;

@Repository
public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan, Integer> {

	public List<WorkoutPlan> findByMemberId(int pMemberId);
	
	public WorkoutPlan findByPlanId(int pPlanId);

}
