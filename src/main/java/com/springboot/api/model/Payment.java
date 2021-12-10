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
@Table(name = "payment")
public class Payment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "paymentId", unique = true, nullable = false, length = 11)
	private int paymentId;

	@Column(name = "userId", length = 11)
	private int userId;
	
	@Column(name = "memberId", length = 11)
	private int memberId;
	
	@Column(name = "amount", length = 45)
	private String amount;
	
	@Column(name = "paymentDate")
	private Date paymentDate;
	
	@Column(name = "paymentTime")
	private Timestamp paymentTime;

	public int getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(int paymentId) {
		this.paymentId = paymentId;
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

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public Timestamp getPaymentTime() {
		return paymentTime;
	}

	public void setPaymentTime(Timestamp paymentTime) {
		this.paymentTime = paymentTime;
	}

	@Override
	public String toString() {
		return "Payment [paymentId=" + paymentId + ", userId=" + userId + ", memberId=" + memberId + ", amount="
				+ amount + ", paymentDate=" + paymentDate + ", paymentTime=" + paymentTime + "]";
	}
	
}
