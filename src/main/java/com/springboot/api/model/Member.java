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
	@Column(name = "memberId", unique = true, nullable = false, length = 11)
	private int memberId;
	
	@Column(name = "firstName", unique = false, nullable = true, length = 45)
	private String firstName;

	@Column(name = "lastName", unique = false, nullable = true, length = 45)
	private String lastName;
	
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
	
	@Column(name = "joiningDate")
	private Date joiningDate;

	@Column(name = "endOfMembershipDate")
	private Date endOfMembershipDate;

	@Column(name = "membershipId", length = 11)
	private int membershipId;
	
	@Column(name = "userId", length = 11)
	private int userId;
	
	@Column(name = "branchId", length = 11)
	private int branchId;
	
	@Column(name = "birthdate")
	private Date birthdate;

	public int getMemberId() {
		return memberId;
	}

	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
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

	public Date getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(Date joiningDate) {
		this.joiningDate = joiningDate;
	}

	public Date getEndOfMembershipDate() {
		return endOfMembershipDate;
	}

	public void setEndOfMembershipDate(Date endOfMembershipDate) {
		this.endOfMembershipDate = endOfMembershipDate;
	}

	public int getMembershipId() {
		return membershipId;
	}

	public void setMembershipId(int membershipId) {
		this.membershipId = membershipId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
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
		return "Member [memberId=" + memberId + ", firstName=" + firstName + ", lastName=" + lastName + ", address="
				+ address + ", contact=" + contact + ", email=" + email + ", age=" + age + ", gender=" + gender
				+ ", joiningDate=" + joiningDate + ", endOfMembershipDate=" + endOfMembershipDate + ", membershipId="
				+ membershipId + ", userId=" + userId + ", branchId=" + branchId + ", birthdate=" + birthdate + "]";
	}
}
