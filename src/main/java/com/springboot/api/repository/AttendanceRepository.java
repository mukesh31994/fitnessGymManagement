package com.springboot.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.api.model.Attendance;
import com.springboot.api.model.Member;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

}
