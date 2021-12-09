package com.springboot.api.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.api.model.Member;
import com.springboot.api.repository.MemberRepository;
import com.springboot.api.service.MemberService;
import org.springframework.data.domain.Sort;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	MemberRepository memberRepository;
	
	@Override
	public void saveMember(Member pMember) {
		memberRepository.save(pMember);
	}

	@Override
	public List<Member> findAll() {
		// TODO Auto-generated method stub
//		return memberRepository.findAll(Sort.by(Sort.Direction.DESC, "memberId"));
		return memberRepository.findAll();
	}

//	@Override
//	public Member findByEmailAddress(String pEmailAddress) {
//		return memberRepository.findByEmailAddress(pEmailAddress);
//	}

//	public String getUsersMenu(String pBuid) {
//		JSONArray lData = new JSONArray();
//		try {
//			List<UserRoleRelation> roles = userRoleRelationService.findByBUID(pBuid);
//			String arrRoles[] = new String[roles.size()];
//			for (int i = 0; i < roles.size(); i++) {
//				arrRoles[i] = ((UserRoleRelation) roles.get(i)).getRoleId();
//			}
//
//			List<RolePermissionRelation> listPermission = rolePermissionRelationService.findByRoleId(arrRoles[0]);
//			List<String> arrPerm = new ArrayList<>();
//
//			for (int i = 0; i < listPermission.size(); i++) {
//				arrPerm.add(((RolePermissionRelation) listPermission.get(i)).getPermissionId());
//			}
//
//			List<Menus> listMenus = menusService.findByPermissionId(arrPerm);
//			
//			for (Menus lMenu : listMenus) {
//				JSONArray lMenuJSON = new JSONArray();
//				lMenuJSON.put(lMenu.getMenuId());
//				lMenuJSON.put(Integer.parseInt(lMenu.getParentId()));
//				lMenuJSON.put(lMenu.getText());
//				lMenuJSON.put(lMenu.getFaFaIcon());
//				lMenuJSON.put(lMenu.getBadg());
//				// lMenuJSON.put(Integer.parseInt(lMenu.getAnonymus()));
//				lMenuJSON.put(lMenu.getLink());
//				lMenuJSON.put(lMenu.getTarget());
//				lMenuJSON.put(lMenu.getDivID());
//				lData.put(lMenuJSON);
//			}
//
//		} catch (Exception e) {
//			// TODO: handle exception
//		}
//
//		return lData.toString();
//	}

}
