package com.springboot.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "membershiptype")
public class MembershipType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "membershipId", unique = true, nullable = false, length = 11)
	private int membershipId;

	@Column(name = "membershipName", length = 50)
	private String membershipName;
	
	@Column(name = "membershipPeriod", length = 11)
	private String membershipPeriod;
	
	@Column(name = "membershipAmount", length = 11)
	private float membershipAmount;

	@Column(name = "signupFee", length = 11)
	private float signupFee;
	
	@Column(name = "userId", unique = true, nullable = false, length = 11)
	private int userId;

	public int getMembershipId() {
		return membershipId;
	}

	public void setMembershipId(int membershipId) {
		this.membershipId = membershipId;
	}

	public String getMembershipName() {
		return membershipName;
	}

	public void setMembershipName(String membershipName) {
		this.membershipName = membershipName;
	}

	public String getMembershipPeriod() {
		return membershipPeriod;
	}

	public void setMembershipPeriod(String membershipPeriod) {
		this.membershipPeriod = membershipPeriod;
	}

	public float getMembershipAmount() {
		return membershipAmount;
	}

	public void setMembershipAmount(float membershipAmount) {
		this.membershipAmount = membershipAmount;
	}

	public float getSignupFee() {
		return signupFee;
	}

	public void setSignupFee(float signupFee) {
		this.signupFee = signupFee;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "MembershipType [membershipId=" + membershipId + ", membershipName=" + membershipName
				+ ", membershipPeriod=" + membershipPeriod + ", membershipAmount=" + membershipAmount + ", signupFee="
				+ signupFee + ", userId=" + userId + "]";
	}

}
