package com.springboot.api.service;

import java.util.List;

import com.springboot.api.model.Attendance;

public interface AttendanceService {
	
	public void saveAttendance(Attendance pAttendance);
	
	public List<Attendance> findByMemberId(int pMemberId);
	 
}
