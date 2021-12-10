package com.springboot.api.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "workout")
public class Workout {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "workoutId", unique = true, nullable = false, length = 11)
	private int workoutId;

	@Column(name = "workoutName", length = 11)
	private String workoutName;

	@Column(name = "description", length = 11)
	private String description;

	@Column(name = "createdDate", length = 11)
	private Date createdDate;

	public int getWorkoutId() {
		return workoutId;
	}

	public void setWorkoutId(int workoutId) {
		this.workoutId = workoutId;
	}

	public String getWorkoutName() {
		return workoutName;
	}

	public void setWorkoutName(String workoutName) {
		this.workoutName = workoutName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}


	@Override
	public String toString() {
		return "Workout [workoutId=" + workoutId + ", workoutName=" + workoutName + ", description=" + description
				+ ", createdDate=" + createdDate + "]";
	}

}
