package com.springboot.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "admin")
public class Admin {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "adminId", unique = true, nullable = false, length = 11)
	private int adminId;

	@Column(name = "adminName", length = 40)
	private String adminName;

	@Column(name = "contact", length = 11)
	private String contact;

	@Column(name = "address", length = 11)
	private String address;

	@Column(name = "email")
	private String email;
	
	@Column(name = "userId", length = 11)
	private int userId;

	public int getAdminId() {
		return adminId;
	}

	public void setAdminId(int adminId) {
		this.adminId = adminId;
	}

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
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
		return "Admin [adminId=" + adminId + ", adminName=" + adminName + ", contact=" + contact + ", address="
				+ address + ", email=" + email + ", userId=" + userId + "]";
	}
}
