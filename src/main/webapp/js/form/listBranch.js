function OnLoad() {

	var url1 = "/getAllBranch";
	var lAjax1 = new FormAjax();
	lAjax1.setUrl(url1);
	lAjax1.setSync(true);
	lAjax1.setData($('form').serialize())
	lAjax1.addEventListener('success', function(response) {
		
		var dataSet = JSON.parse(response);
		$('#example').dataTable({
			"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>" +
				"t" +
				"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
			"autoWidth": true,
			"oLanguage": {
				"sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>',
				"order": [[ 3, "desc" ]]
			},
			data: dataSet,
			columns: viewConfig.branchList.columns
		});

	});
	lAjax1.addEventListener('error', function(textStatus, errorThrown) {
		console.log(textStatus + " ; " + errorThrown);
	});
	lAjax1.execute();
}


