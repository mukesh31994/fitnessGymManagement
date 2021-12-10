package com.springboot.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "instructor")
public class Instructor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "instructorId", unique = true, nullable = false, length = 11)
	private int instructorId;

	@Column(name = "instructorName", length = 11)
	private String instructorName;
	
	@Column(name = "contact", length = 11)
	private String contact;
	
	@Column(name = "address", length = 11)
	private String address;

	@Column(name = "email", length = 11)
	private String email;
	
	@Column(name = "userId", unique = true, nullable = false, length = 11)
	private int userId;

	public int getInstructorId() {
		return instructorId;
	}

	public void setInstructorId(int instructorId) {
		this.instructorId = instructorId;
	}

	public String getInstructorName() {
		return instructorName;
	}

	public void setInstructorName(String instructorName) {
		this.instructorName = instructorName;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "Instructor [instructorId=" + instructorId + ", instructorName=" + instructorName + ", contact="
				+ contact + ", address=" + address + ", email=" + email + ", userId=" + userId + "]";
	}
	
}
