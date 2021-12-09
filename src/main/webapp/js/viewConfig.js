
var memberList = {
    columns: [
				{
					mDataProp: 'member_id',
					title: 'ID',
					type: 'number',
					width: '20',
		//			sortable: true,
					
				},
				{
					mDataProp: 'first_name',
					title: 'first_name',
					type: 'string',
					width: '20',
					render: function(pValue, meta, record) {debugger;
						var reqStr = '<a  href="#ui/form/UpdateMember.html?id=' + record.member_id + '" id="' + pValue + '" type="ajax">' + pValue + '</a>';
						return reqStr;
					}
		//			sortable: true
				},
				{
					mDataProp: 'last_name',
					title: 'last_name',
					type: 'string',
					width: '20',
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
					title: 'gender',
					type: 'string',
					width: '20',
		//			sortable: true,
					//            render: dateFormat
				}
			]
};

var viewConfig = {
    "memberList": memberList,
  //  "interest": interest
};