package com.springboot.api.model;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "attendance")
public class Attendance {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "attendanceId", unique = true, nullable = false, length = 11)
	private int attendanceId;

	@Column(name = "userId", length = 11)
	private int userId;
	
	@Column(name = "memberId", length = 11)
	private int memberId;
	
	@Column(name = "date", length = 11)
	private Timestamp date;

	public int getAttendanceId() {
		return attendanceId;
	}

	public void setAttendanceId(int attendanceId) {
		this.attendanceId = attendanceId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getMemberId() {
		return memberId;
	}

	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Attendance [attendanceId=" + attendanceId + ", userId=" + userId + ", memberId=" + memberId + ", date="
				+ date + "]";
	}
	
}
