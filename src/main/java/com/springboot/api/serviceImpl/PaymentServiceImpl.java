package com.springboot.api.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.api.model.Payment;
import com.springboot.api.repository.PaymentRepository;
import com.springboot.api.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	PaymentRepository paymentRepository;

	@Override
	public void savePayment(Payment pPayment) {
		paymentRepository.save(pPayment);
	}

	@Override
	public List<Payment> findByMemberId(int pMemberId) {
		return paymentRepository.findByMemberId(pMemberId);
	}

}
