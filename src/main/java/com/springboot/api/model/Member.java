package com.springboot.api.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "member")
public class Member {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "member_id", unique = true, nullable = false, length = 11)
	private int member_id;
	
	@Column(name = "first_name", unique = false, nullable = true, length = 45)
	private String first_name;

	@Column(name = "last_name", unique = false, nullable = true, length = 45)
	private String last_name;
	
	@Column(name = "address", unique = false, nullable = true, length = 45)
	private String address;
	
	@Column(name = "contact", unique = false, nullable = true, length = 45)
	private String contact;
	
	@Column(name = "email", unique = false, nullable = true, length = 45)
	private String email;
	
	@Column(name = "age", unique = false, nullable = true, length = 11)
	private int age;

	@Column(name = "gender", unique = false, nullable = true, length = 45)
	private String gender;
	
	@Column(name = "joining_date")
	private Date joining_date;

	@Column(name = "end_of_membership_date")
	private Date end_of_membership_date;

	@Column(name = "membership_id", length = 11)
	private int membership_id;
	
	@Column(name = "user_id", length = 11)
	private int user_id;
	
	@Column(name = "branchId", length = 11)
	private int branchId;
	
	@Column(name = "birthdate")
	private Date birthdate;

	public int getMember_id() {
		return member_id;
	}

	public void setMember_id(int member_id) {
		this.member_id = member_id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getJoining_date() {
		return joining_date;
	}

	public void setJoining_date(Date joining_date) {
		this.joining_date = joining_date;
	}

	public Date getEnd_of_membership_date() {
		return end_of_membership_date;
	}

	public void setEnd_of_membership_date(Date end_of_membership_date) {
		this.end_of_membership_date = end_of_membership_date;
	}

	public int getMembership_id() {
		return membership_id;
	}

	public void setMembership_id(int membership_id) {
		this.membership_id = membership_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public int getBranchId() {
		return branchId;
	}

	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}

	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	@Override
	public String toString() {
		return "Member [member_id=" + member_id + ", first_name=" + first_name + ", last_name=" + last_name
				+ ", address=" + address + ", contact=" + contact + ", email=" + email + ", age=" + age + ", gender="
				+ gender + ", joining_date=" + joining_date + ", end_of_membership_date=" + end_of_membership_date
				+ ", membership_id=" + membership_id + ", user_id=" + user_id + ", branchId=" + branchId
				+ ", birthdate=" + birthdate + "]";
	}
	
}
