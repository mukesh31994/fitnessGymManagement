
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
				debugger;
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
				debugger;
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
				debugger;
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
				debugger;
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
				debugger;
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
				debugger;
				return workoutJson[pValue];
			}
		},
		{
			mDataProp: 'workoutDate',
			title: 'Date',
			type: 'date',
			width: '20'
		},
		{
			mDataProp: 'instructorId',
			title: 'instructor Id',
			type: 'number',
			width: '20'
		}
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
			mDataProp: 'description',
			title: 'Description',
			type: 'string',
			width: '20'
		}
	]
};

var viewConfig = {
	"memberList": memberList,
	"attendance": attendanceList,
	"paymentList": paymentList,
	"instructorList":instructorList,
	"workoutList":workoutList,
	"workoutPlanList":workoutPlanList,
	"adminList":adminList,
	"branchList":branchList
};