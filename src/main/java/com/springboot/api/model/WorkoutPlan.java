package com.springboot.api.model;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "workoutplan")
public class WorkoutPlan {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "planId", unique = true, nullable = false, length = 11)
	private int planId;

	@Column(name = "memberId", length = 11)
	private int memberId;

	@Column(name = "workoutId", length = 11)
	private int workoutId;

	@Column(name = "workoutDate", length = 11)
	private Date workoutDate;

	@CreationTimestamp
	@Column(name = "workoutTime", length = 11)
	private Timestamp workoutTime;

	@Column(name = "instructorId", length = 11)
	private int instructorId;

	public int getPlanId() {
		return planId;
	}

	public void setPlanId(int planId) {
		this.planId = planId;
	}

	public int getMemberId() {
		return memberId;
	}

	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}

	public int getWorkoutId() {
		return workoutId;
	}

	public void setWorkoutId(int workoutId) {
		this.workoutId = workoutId;
	}

	public Date getWorkoutDate() {
		return workoutDate;
	}

	public void setWorkoutDate(Date workoutDate) {
		this.workoutDate = workoutDate;
	}

	public Timestamp getWorkoutTime() {
		return workoutTime;
	}

	public void setWorkoutTime(Timestamp workoutTime) {
		this.workoutTime = workoutTime;
	}

	public int getInstructorId() {
		return instructorId;
	}

	public void setInstructorId(int instructorId) {
		this.instructorId = instructorId;
	}

	@Override
	public String toString() {
		return "WorkoutPlan [planId=" + planId + ", memberId=" + memberId + ", workoutId=" + workoutId
				+ ", workoutDate=" + workoutDate + ", workoutTime=" + workoutTime + ", instructorId=" + instructorId
				+ "]";
	}

}
