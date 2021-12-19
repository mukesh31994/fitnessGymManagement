
var memberList = {
	columns: [
		{
			mDataProp: 'memberId',
			title: 'ID',
			type: 'number',
			visible: false,
			width: '20',
			//			sortable: true,

		},
		{
			mDataProp: 'firstName',
			title: 'First Name',
			type: 'string',
			width: '20',
			/*render: function(pValue, meta, record) {
				
				var reqStr = '<a    href="#ui/form/UpdateMember.html?id=' + record.memberId + '" id="' + pValue + '" type="ajax">' + pValue + '</a>';
				return reqStr;
			}*/
			//			sortable: true class="btn btn-info btn-sm"
		},
		{
			mDataProp: 'lastName',
			title: 'Last Name',
			type: 'string',
			width: '20',
			//			sortable: true
		},
		{
			mDataProp: 'contact',
			title: 'Contact',
			type: 'number',
			width: '20',
			//			sortable: true
		},
		{
			mDataProp: 'email',
			title: 'Email',
			type: 'string',
			width: '20',
			//			sortable: true,
			//            render: dateFormat
		},
		{
			mDataProp: 'age',
			title: 'Age',
			type: 'string',
			width: '20',
			//			sortable: true,
			//            render: dateFormat
		},
		{
			mDataProp: 'gender',
			title: 'Gender',
			type: 'string',
			width: '20',
			//			sortable: true,
			//            render: dateFormat
		},
		{
			mDataProp: '',
			title: 'Edit',
			type: 'string',
			width: '20',
			render: function(pValue, meta, record) {
				
				var reqStr = '<a class="btn btn-info btn-sm" href="#ui/form/UpdateMember.html?id=' + record.memberId + '" id="' + pValue + '" type="ajax">Edit <i class="fa fa-edit"></i> </a>';
				return reqStr;
			}
		}
	]
};

var adminList = {
	columns: [
		{
			mDataProp: 'adminId',
			title: 'ID',
			type: 'number',
			width: '20',
			//			sortable: true,

		},
		{
			mDataProp: 'adminName',
			title: 'Admin Name',
			type: 'string',
			width: '20'
			//			sortable: true
		},
		{
			mDataProp: 'contact',
			title: 'Contact',
			type: 'string',
			width: '20',
			//			sortable: true
		},
		{
			mDataProp: 'email',
			title: 'Email',
			type: 'string',
			width: '20',
			//			sortable: true
		},
		{
			mDataProp: 'address',
			title: 'Address',
			type: 'string',
			width: '20',
			//			sortable: true,
			//            render: dateFormat
		}
	]
};

var instructorList = {
	columns: [
		{
			mDataProp: 'instructorId',
			title: 'ID',
			type: 'number',
			width: '20',
			//			sortable: true,

		},
		{
			mDataProp: 'instructorName',
			title: 'Name',
			type: 'string',
			width: '20',
			render: function(pValue, meta, record) {
				
				var reqStr = '<a  href="#ui/form/UpdateInstructor.html?id=' + record.instructorId + '" id="' + pValue + '" type="ajax">' + pValue + '</a>';
				return reqStr;
			}
			//			sortable: true
		},
		{
			mDataProp: 'contact',
			title: 'contact',
			type: 'number',
			width: '20',
			//			sortable: true
		},
		{
			mDataProp: 'email',
			title: 'email',
			type: 'string',
			width: '20',
			//			sortable: true,
			//            render: dateFormat
		}
	]
};


var workoutList = {
	columns: [
		{
			mDataProp: 'workoutId',
			title: 'ID',
			type: 'number',
			width: '20'
		},
		{
			mDataProp: 'workoutName',
			title: 'workout Name',
			type: 'string',
			width: '20',
			render: function(pValue, meta, record) {
				
				var reqStr = '<a  href="#ui/form/UpdateWorkout.html?id=' + record.workoutId + '" id="' + pValue + '" type="ajax">' + pValue + '</a>';
				return reqStr;
			}
		},
		{
			mDataProp: 'description',
			title: 'description',
			type: 'string',
			width: '20'
		}
	]
};

var workoutPlanList = {
	columns: [
		{
			mDataProp: 'planId',
			title: 'ID',
			type: 'number',
			width: '20'
		},
		{
			mDataProp: 'memberId',
			title: 'Member Id',
			type: 'number',
			width: '20',
			render: function(pValue, meta, record) {
				
				var reqStr = '<a  href="#ui/form/UpdateWorkoutPlan.html?id=' + record.planId + '" id="' + pValue + '" type="ajax">' + pValue + '</a>';
				return reqStr;
			}
		},
		{
			mDataProp: 'workoutId',
			title: 'Workout Id',
			type: 'string',
			width: '20',
			render: function(pValue, meta, record) {
				
				return workoutJson[pValue];
			}
		},
		{
			mDataProp: 'workoutDate',
			title: 'Date',
			type: 'date',
			width: '20'
		}
		/*,
		{
			mDataProp: 'instructorId',
			title: 'instructor Id',
			type: 'number',
			width: '20'
		}*/
	]
};

var attendanceList = {
	columns: [
		{
			mDataProp: 'memberId',
			title: 'Serial Number',
			type: 'string',
			width: '20',
			render: function(nRow, meta, record,iDisplayIndex) {
				return iDisplayIndex.row+1;
			}
		},
		{
			mDataProp: 'date',
			title: 'Attendance Punching Time',
			type: 'string',
			width: '20',
			render: function(data, type, row) {//data
				return moment(row.date).format('DD/MM/YYYY hh:mm:ss');
			}
			//			sortable: true,

		}
	]
};

var paymentList = {
	columns: [
		{
			mDataProp: 'paymentId',
			title: 'Payment Id',
			type: 'string',
			width: '20'
		},
		{
			mDataProp: 'amount',
			title: 'Payment Amount',
			type: 'number',
			width: '20'
		},
		{
			mDataProp: 'paymentTime',
			title: 'Payment Time',
			type: 'string',
			width: '20',
			render: function(data, type, row) {//data
				return moment(row.paymentTime).format('DD/MM/YYYY hh:mm:ss');
			}
		}
	]
};


var branchList = {
	columns: [
		{
			mDataProp: 'branchName',
			title: 'Branch Name',
			type: 'string',
			width: '20'
		},
		{
			mDataProp: 'contact',
			title: 'Contact',
			type: 'string',
			width: '20'
		},
		{
			mDataProp: 'address',
			title: 'address',
			type: 'string',
			width: '20'
		}
	]
};

var permotional = {
	"SAVE" : "<div id=\"bodyDiv\"style=\"background-color: aqua; height: 600px; width: 400px; text-align: center;margin: 0 auto;\"><div id=\"headerDiv\" style=\"background-color: beige; padding: 20px;\"><div id=\"imageDiv\"><img src=\"cid:image\" alt=\"logo\" width=\"150\" height=\"150\"></div><H3>Fitness Gym Management</H3></div><div id=\"bodyPanelDiv\"><P id=\"saveText\" style=\"margin: 0px; font-size: 150px; font-weight: bold; color: cornflowerblue;\">SAVE</P><BR><P id=\"upToText\"style=\"margin: 0px; font-size: 50px; font-style: italic; font-weight: bold; color: aqua; background: azure; padding: 10px;\">Up to 70%</P></div><div id=\"footerDiv\" style=\"font-size: 25px; color: cornflowerblue; font-weight: bold; background-color: aqua; padding-bottom: 20px;\"><P id=\"footerText\"><B>Any further details please contact Fitness gym management office</B></P></div></div>",
	"OFFER" : "<div style=\"background-color: red; height: 600px; width: 400px; text-align: center;margin: 0 auto;\"><div id=\"headerDiv\" style=\"background-color: gold; padding: 20px;\"><div id=\"imageDiv\"><img src=\"cid:image\" alt=\"logo\" width=\"150\" height=\"150\"></div><H3>Fitness Gym Management</H3></div><div id=\"bodyPanelDiv\"><P style=\"margin: 0px; font-size: 80px; font-weight: bold; color: white;\">Christmas<BR>Offers</P><BR><P style=\"margin: 0px; font-size: 50px; font-style: italic; font-weight: bold; color: red; background: gold; padding: 10px;\">BUY 1 GET 1<BR>FREE</P></div><div id=\"footerDiv\"style=\"font-size: 25px; color: gold; font-weight: bold; background-color: red; padding-bottom: 20px;\"><P id=\"footerText\"><B>Any further details please contact Fitness gym managementoffice</B>.</P></div></div>"
};

var viewConfig = {
	"memberList": memberList,
	"attendance": attendanceList,
	"paymentList": paymentList,
	"instructorList":instructorList,
	"workoutList":workoutList,
	"workoutPlanList":workoutPlanList,
	"adminList":adminList,
	"branchList":branchList,
	"permotional":permotional
};