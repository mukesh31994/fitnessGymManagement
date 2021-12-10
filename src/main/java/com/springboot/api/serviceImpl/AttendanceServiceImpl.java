package com.springboot.api.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.api.model.Attendance;
import com.springboot.api.repository.AttendanceRepository;
import com.springboot.api.service.AttendanceService;

@Service
public class AttendanceServiceImpl implements AttendanceService {

	@Autowired
	AttendanceRepository attendanceRepository;

	@Override
	public void saveAttendance(Attendance pAttendance) {
		attendanceRepository.save(pAttendance);
	}

}
