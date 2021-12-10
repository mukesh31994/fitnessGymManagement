package com.springboot.api.service;

import java.util.List;

import com.springboot.api.model.Payment;

public interface PaymentService {
	
	public void savePayment(Payment pPayment);
	
	public List<Payment> findByMemberId(int pMemberId);
	 
}
