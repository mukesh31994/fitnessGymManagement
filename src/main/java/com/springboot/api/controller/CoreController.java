package com.springboot.api.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.api.model.Admin;
import com.springboot.api.model.Attendance;
import com.springboot.api.model.Branchmaster;
import com.springboot.api.model.Instructor;
import com.springboot.api.model.Member;
import com.springboot.api.model.MembershipType;
import com.springboot.api.model.Payment;
import com.springboot.api.model.User;
import com.springboot.api.model.Workout;
import com.springboot.api.model.WorkoutPlan;
import com.springboot.api.service.AdminService;
import com.springboot.api.service.AttendanceService;
import com.springboot.api.service.BranchService;
import com.springboot.api.service.InstructorService;
import com.springboot.api.service.MemberService;
import com.springboot.api.service.MembershipTypeService;
import com.springboot.api.service.PaymentService;
import com.springboot.api.service.UserService;
import com.springboot.api.service.WorkoutPlanService;
import com.springboot.api.service.WorkoutService;
import com.springboot.api.utility.SendEmailTLS;

//import com.google.gson.Gson;
//import com.management.common.model.User_Master;

@RestController
public class CoreController {

	@Autowired
	MemberService memberService;

	@Autowired
	AttendanceService attendanceService;

	@Autowired
	PaymentService paymentService;

	@Autowired
	InstructorService instructorService;

	@Autowired
	WorkoutService workoutService;
	
	@Autowired
	WorkoutPlanService workoutPlanService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	MembershipTypeService membershipTypeService;
	
	@Autowired
	AdminService adminService;
	
	@Autowired
	BranchService branchService;

	@GetMapping("welcome")
	public String getMessage() {
		return "Welcome to Azure Web App for Containers ";
	}

	@RequestMapping(value = "/addMember", method = RequestMethod.POST)
	public @ResponseBody Member addMember(Member lMember) {
		lMember.setJoiningDate(new java.sql.Date(Calendar.getInstance().getTime().getTime()));
		return memberService.saveMember(lMember);

//		return "success";
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
		lAttendance.setDate(new java.sql.Timestamp(Calendar.getInstance().getTime().getTime()));
//		List<Attendance> lListAttendance = attendanceService.findByMemberIdAndDate(lAttendance.getMemberId(),lAttendance.getDate());
//		System.out.println(lListAttendance);
		attendanceService.saveAttendance(lAttendance);
		return "success";
	}

	@RequestMapping(value = "/getAttendanceByMemberId", method = RequestMethod.POST)
	public Set<Attendance> getAttendanceByMemberId(@RequestParam(value = "memberId") int memberId) {
		return attendanceService.findByMemberId(memberId);
	}

	@RequestMapping(value = "/addPayment", method = RequestMethod.POST)
	public @ResponseBody String addPayment(Payment lPayment) {
		lPayment.setPaymentDate(new java.sql.Date(Calendar.getInstance().getTime().getTime()));
		lPayment.setPaymentTime(new java.sql.Timestamp(Calendar.getInstance().getTime().getTime()));
		paymentService.savePayment(lPayment);
		return "success";
	}

	@RequestMapping(value = "/getPaymentByMemberId", method = RequestMethod.POST)
	public List<Payment> getPaymentByMemberId(@RequestParam(value = "memberId") int memberId) {
		return paymentService.findByMemberId(memberId);
	}

	/* -----------Instructor Controller----------- */

	@RequestMapping(value = "/addInstructor", method = RequestMethod.POST)
	public @ResponseBody String addInstructor(User lUser) {
//		lInstructor.setUserId(1);
//		instructorService.saveInstructor(lInstructor);
		lUser.setCreatedTime(new java.sql.Timestamp(Calendar.getInstance().getTime().getTime()));
		userService.saveUserAsInstructor(lUser);
		return "success";
	}

	@RequestMapping(value = "/getAllInstructor", method = RequestMethod.POST)
	public List<Instructor> getAllInstructor() {
		return instructorService.findAll();
	}

	@RequestMapping(value = "/getByInstructorId", method = RequestMethod.POST)
	public Instructor getByInstructorId(@RequestParam(value = "instructorId") int instructorId) {
		return instructorService.findByInstructorId(instructorId);
	}

	/* -----------Workout Controller----------- */

	@RequestMapping(value = "/addWorkout", method = RequestMethod.POST)
	public @ResponseBody String addWorkout(Workout lWorkout) {
		lWorkout.setCreatedDate(new java.sql.Timestamp(Calendar.getInstance().getTime().getTime()));
		workoutService.saveWorkout(lWorkout);
		return "success";
	}

	@RequestMapping(value = "/getAllWorkout", method = RequestMethod.POST)
	public List<Workout> getAllWorkout() {
		return workoutService.findAll();
	}

	@RequestMapping(value = "/getByWorkoutId", method = RequestMethod.POST)
	public Workout getByWorkoutId(@RequestParam(value = "workoutId") int workoutId) {
		return workoutService.findByWorkoutId(workoutId);
	}
	
	
	/* -----------Workout Plan Controller----------- */

	@RequestMapping(value = "/addWorkoutPlan", method = RequestMethod.POST)
	public @ResponseBody String addWorkoutPlan(WorkoutPlan lWorkoutPlan) {
		workoutPlanService.saveWorkoutPlan(lWorkoutPlan);
		return "success";
	}

	@RequestMapping(value = "/getWorkoutPlanByMemberId", method = RequestMethod.POST)
	public List<WorkoutPlan> getWorkoutPlanByMemberId(@RequestParam(value = "memberId") int memberId) {
		return workoutPlanService.findByMemberId(memberId);
	}
	
	@RequestMapping(value = "/getByPlanId", method = RequestMethod.POST)
	public WorkoutPlan getByPlanId(@RequestParam(value = "planId") int planId) {
		return workoutPlanService.findByPlanId(planId);
	}
	
	/* -----------User Controller----------- */
	
	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public @ResponseBody String addUser(User lUser) {
		lUser.setCreatedTime(new java.sql.Timestamp(Calendar.getInstance().getTime().getTime()));
		userService.saveUser(lUser);
		return "success";
	}
	
	@RequestMapping(value = "/getAllAdmin", method = RequestMethod.POST)
	public List<Admin> getAllAdmin() {
		return adminService.findAll();
	}
	
	@RequestMapping(value = "/getAllMembershipType", method = RequestMethod.POST)
	public List<MembershipType> getAllMembershipType() {
		return membershipTypeService.findAll();
	}
	
	@RequestMapping(value = "/myuser", method = RequestMethod.POST)
	@ResponseBody
	public User getUsername(HttpServletRequest req) {
		User lUser = userService.findByUsername(req.getUserPrincipal().getName());
	    return lUser;
	}
	
	/* promotional */
	
	@RequestMapping(value = "/sendPromotionalEmail", method = RequestMethod.POST)
	public boolean sendPromotionalEmail(@RequestParam(value = "memberList") String[] memberList, @RequestParam(value = "templateId") String templateId) {
		SendEmailTLS lSendEmailTLS = new SendEmailTLS();
		boolean lResult = lSendEmailTLS.sendEmailToMember(memberList,templateId);
		return lResult;
	}
	
	@RequestMapping(value = "/calculatePayment", method = RequestMethod.POST)
	public Map<String,String> calculatePayment(@RequestParam(value = "memberId") int memberId) {
		Map<String,String> lMap = new HashMap<String, String>();
		List<Payment> lPaymentList = paymentService.findByMemberId(memberId);
		int sum = lPaymentList.stream().mapToInt(o -> (o.getAmount()==""?0:Integer.parseInt(o.getAmount()))).sum();
		Member lMember = memberService.findByMemberId(memberId);
		MembershipType lMembershipType = membershipTypeService.findByMembershipId(lMember.getMembershipId());
		lMap.put("totalPayment", sum + "");
		lMap.put("membershipAmount", lMembershipType.getMembershipAmount() + "");
		return lMap;
	}
	
	@RequestMapping(value = "/addBranch", method = RequestMethod.POST)
	public @ResponseBody Branchmaster addBranch(Branchmaster lBranchmaster) {
		return branchService.saveBranch(lBranchmaster);

//		return "success";
	}

}
