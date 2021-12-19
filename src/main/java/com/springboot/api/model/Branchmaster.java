package com.springboot.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "branchmaster")
public class Branchmaster {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "branchId", unique = true, nullable = false, length = 11)
	private int branchId;

	@Column(name = "branchName", length = 40)
	private String branchName;

	@Column(name = "address", length = 11)
	private String address;

	@Column(name = "contact", length = 11)
	private String contact;

	@Column(name = "userId", length = 11)
	private int userId;

	public int getBranchId() {
		return branchId;
	}

	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "Branchmaster [branchId=" + branchId + ", branchName=" + branchName + ", address=" + address
				+ ", contact=" + contact + ", userId=" + userId + "]";
	}

}
