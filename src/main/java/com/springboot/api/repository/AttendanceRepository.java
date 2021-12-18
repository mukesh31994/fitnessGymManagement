package com.springboot.api.repository;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springboot.api.model.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

	public Set<Attendance> findByMemberId(int pMemberId);
	
	public static final EntityManager em = null;
	
//	@Query("SELECT a FROM Attendance a WHERE m.memberId = ?1 and m.date = ?2")
//	public List<Attendance> findByMemberIdAndDate(int memberId, Date date);
	
//	public default List<Attendance> findByMemberIdAndDate(Date start, Date end)
//    {        
//        SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
//        String startFormat = format1.format(start.getTime());
//        String endFormat = format1.format(end.getTime());            
//        List<Attendance> list;
//        String queryString = 
//        "SELECT a FROM attendance a "
//                + "WHERE a.memberId = 1 "
//                + "AND "
//                + "o.endDate <= :startFormat "
//                + "ORDER BY o.startDate";
////        Query q = (Query) em.createQuery(queryString);
////        q.setParameter("param1", startFormat);
////        q.setParameter("param2", endFormat);
////        list = q.getResultList();
//        return list;
//    }
	
}
