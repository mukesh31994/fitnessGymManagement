package com.springboot.api.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springboot.api.model.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

	public List<Attendance> findByMemberId(int pMemberId);
	
//	@Query("SELECT a FROM Attendance a WHERE m.memberId = ?1 and m.date = ?2")
//	public List<Attendance> findByMemberIdAndDate(int memberId, Date date);
	
}
