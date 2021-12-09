package com.springboot.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.api.model.Member;
import com.springboot.api.service.MemberService;


//import com.google.gson.Gson;
//import com.management.common.model.User_Master;

@RestController
public class CoreController {
	
	@Autowired
	MemberService memberService;
	
	@GetMapping("welcome")
	public String getMessage() {
		return "Welcome to Azure Web App for Containers ";
	}
	
	@RequestMapping(value = "/addMember", method = RequestMethod.POST)
	public @ResponseBody String getUser(@RequestParam("emailAddress") String pEmailAddress) {
		System.out.println("inside getUser : " + pEmailAddress);
		Member lMember = new Member();
		lMember.setFirst_name(pEmailAddress);
		lMember.setLast_name(pEmailAddress);
		memberService.saveMember(lMember);
//		JSONObject lJSON = new JSONObject();
//		Gson gson = new Gson();
//		try {
//			lUser = userService.findByEmailAddress(pEmailAddress);
//			System.out.println(lUser);
//			String menus = userService.getUsersMenu("" + lUser.getUserId());
//			lJSON.put("data", menus);
//			lJSON.put("user", gson.toJson(lUser));
//			System.out.println(lJSON);
//		} catch (Exception e) {
//			// TODO: handle exception
//		}
		return "success";
	}

}
