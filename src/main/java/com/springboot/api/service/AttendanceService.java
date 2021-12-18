package com.springboot.api.service;

import java.sql.Date;
import java.util.List;
import java.util.Set;

import com.springboot.api.model.Attendance;

public interface AttendanceService {
	
	public void saveAttendance(Attendance pAttendance);
	
	public Set<Attendance> findByMemberId(int pMemberId);
	
//	public List<Attendance> findByMemberIdAndDate(int memberId, Date date);
	 
}
