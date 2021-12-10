package com.springboot.api.controller;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.api.model.Attendance;
import com.springboot.api.model.Member;
import com.springboot.api.service.AttendanceService;
import com.springboot.api.service.MemberService;


//import com.google.gson.Gson;
//import com.management.common.model.User_Master;

@RestController
public class CoreController {
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	AttendanceService attendanceService;
	
	@GetMapping("welcome")
	public String getMessage() {
		return "Welcome to Azure Web App for Containers ";
	}
	
	@RequestMapping(value = "/addMember", method = RequestMethod.POST)
	public @ResponseBody String addMember(Member lMember) {
		lMember.setJoining_date(new java.sql.Date(Calendar.getInstance().getTime().getTime()));
		memberService.saveMember(lMember);

		return "success";
	}
	
	@RequestMapping(value = "/getAllMember", method = RequestMethod.POST)
	public List<Member> getAllMember() {
		return memberService.findAll();
	}

	@RequestMapping(value = "/getByMemberId", method = RequestMethod.POST)
	public Member getByMemberId(@RequestParam(value = "memberId") int memberId) {
		return memberService.findByMemberId(memberId);
	}
	
	@RequestMapping(value = "/addAttendance", method = RequestMethod.POST)
	public @ResponseBody String addAttendance(Attendance lAttendance) {
		lAttendance.setDate(new java.sql.Date(Calendar.getInstance().getTime().getTime()));
		attendanceService.saveAttendance(lAttendance);
		return "success";
	}
	
	@RequestMapping(value = "/getAttendanceByMemberId", method = RequestMethod.POST)
	public List<Attendance> getAttendanceByMemberId(@RequestParam(value = "memberId") int memberId) {
		return attendanceService.findByMemberId(memberId);
	}

}
