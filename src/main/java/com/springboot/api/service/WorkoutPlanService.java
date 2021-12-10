package com.springboot.api.service;

import java.util.List;

import com.springboot.api.model.WorkoutPlan;

public interface WorkoutPlanService {

	public void saveWorkoutPlan(WorkoutPlan pWorkoutPlan);

	public List<WorkoutPlan> findByMemberId(int pMemberId);

	public WorkoutPlan findByPlanId(int pPlanId);

}
