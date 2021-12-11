
var memberList = {
	columns: [
		{
			mDataProp: 'memberId',
			title: 'ID',
			type: 'number',
			width: '20',
			//			sortable: true,

		},
		{
			mDataProp: 'firstName',
			title: 'First Name',
			type: 'string',
			width: '20',
			render: function(pValue, meta, record) {
				debugger;
				var reqStr = '<a  href="#ui/form/UpdateMember.html?id=' + record.memberId + '" id="' + pValue + '" type="ajax">' + pValue + '</a>';
				return reqStr;
			}
			//			sortable: true
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
			title: 'age',
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
			title: 'Member Id',
			type: 'string',
			width: '20',
			render: function(pValue, meta, record) {
				debugger;
				return pValue;
			}
		},
		{
			mDataProp: 'date',
			title: 'Date',
			type: 'string',
			width: '20',
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
	"workoutPlanList":workoutPlanList
};