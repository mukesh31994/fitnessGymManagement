package com.springboot.api.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "userId", unique = true, nullable = false, length = 11)
	private int userId;

	@Column(name = "username", length = 11)
	private String username;

	@Column(name = "password", length = 11)
	private String password;

	@Column(name = "roles", length = 11)
	private String roles;

	@Column(name = "createdTime")
	private Timestamp createdTime;
	
	@Column(name = "branchId", length = 11)
	private int branchId;
	
	@Column(name = "active", length = 11)
	private boolean active = true;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public Timestamp getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Timestamp createdTime) {
		this.createdTime = createdTime;
	}

	public int getBranchId() {
		return branchId;
	}

	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", username=" + username + ", password=" + password + ", roles=" + roles
				+ ", createdTime=" + createdTime + ", branchId=" + branchId + ", active=" + active + "]";
	}
	
}
