package com.springboot.api.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.api.model.WorkoutPlan;
import com.springboot.api.repository.WorkoutPlanRepository;
import com.springboot.api.service.WorkoutPlanService;

@Service
public class WorkoutPlanServiceImpl implements WorkoutPlanService {

	@Autowired
	WorkoutPlanRepository workoutPlanRepository;

	@Override
	public void saveWorkoutPlan(WorkoutPlan pWorkoutPlan) {
		workoutPlanRepository.save(pWorkoutPlan);
	}

	@Override
	public List<WorkoutPlan> findByMemberId(int pMemberId) {
		return workoutPlanRepository.findByMemberId(pMemberId);
	}

	@Override
	public WorkoutPlan findByPlanId(int pPlanId) {
		return workoutPlanRepository.findByPlanId(pPlanId);
	}

}
