
jQuery(document).ready(function(){
    var registItemId = $("#registItemId").val();//获取供应链ID
	//创建jqGrid组件
	jQuery("#list1").jqGrid({
		url : '../basicInfo/registItemList.do?id='+registItemId,//组件创建完成之后请求数据的url
		datatype : "json",//请求数据返回的类型。可选json,xml,txt
		rownumbers: true,
		colNames : ['<b>企业名称</b>','<b>法人代表姓名</b>','<b>注册号</b>','<b>注册资本(万元)</b>','<b>实收资本(万元)</b>','<b>币种</b>','<b>企业(机构)类型</b>','<b>经营状态</b>','<b>行业门类代码</b>','<b>国民经济行业代码</b>'],//jqGrid的列显示名字
		colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
		 		    {name:'companyName',index:'companyName', width:80,sortable:false},
					{name:'legalRepresentative',index:'legalRepresentative', width:80,sortable:false},
					{name:'registNumber',index:'registNumber', width:80,sortable:false}, 
					{name:'registeredCapital',index:'registeredCapital', width:80,sortable:false},
					{name:'paidInCapital',index:'paidInCapital', width:80,sortable:false},
					{name:'currency',index:'currency', width:80,sortable:false},
					{name:'companyType',index:'companyType', width:80,sortable:false},
					{name:'operateState',index:'operateState', width:80,sortable:false},
					{name:'tradeCode',index:'tradeCode', width:80,sortable:false},
					{name:'countryTradeCode',index:'countryTradeCode', width:80,sortable:false}
		           ],
		autowidth : true,
		height: 'auto',
		mtype : "post",//向后台请求数据的ajax的类型。可选post,get
		viewrecords : true,
		caption : "注册信息列表"//表格的标题名字
	});
	
	//创建jqGrid组件
	jQuery("#list2").jqGrid({
		url : '../lawRisk/breakPromiseExecutedList.do?registItemId='+registItemId,//组件创建完成之后请求数据的url
		datatype : "json",//请求数据返回的类型。可选json,xml,txt
		rownumbers: true,
		colNames : ['<b>立案时间</b>','<b>法定代表人</b>','<b>组织机构号</b>','<b>生效法律文书确定的义务</b>','<b>失信被执行人为具体情形</b>','<b>被执行人的履行情况</b>','<b>全部未履行</b>','<b>公布时间</b>','<b>省份</b>','<b>执行依据文号</b>','<b>执行法院</b>','<b>操作</b>' ],//jqGrid的列显示名字
		colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
		 		    {name:'caseFilingTime',index:'caseFilingTime', width:80,sortable:false},
		 		    {name:'legalPerson',index:'legalPerson', width:80,sortable:false},
		 		    {name:'organizationNo',index:'organizationNo', width:80,sortable:false},
		 		    {name:'obligation',index:'obligation', width:80,sortable:false},
		 		    {name:'executedCondition',index:'executedCondition', width:80,sortable:false},
		 		    {name:'performCondition',index:'performCondition', width:80,sortable:false},
		 		    {name:'nonperforming',index:'nonperforming', width:80,sortable:false},
		 		    {name:'publishTime',index:'publishTime', width:80,sortable:false},
		 		    {name:'province',index:'province', width:80,sortable:false},
		 		    {name:'accordingNo',index:'accordingNo', width:80,sortable:false},
		 		    {name:'executeCourt',index:'executeCourt', width:80,sortable:false},
					{name:'id',index:'id', width:130,formatter:getActions,sortable:false,resizable:false,align:'center'}
		           ],
		rowNum : 10,//一页显示多少条
		rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
		pager : '#pager2',//表格页脚的占位符(一般是div)的id
		autowidth : true,
		height: 'auto',
		mtype : "post",//向后台请求数据的ajax的类型。可选post,get
		viewrecords : true,
	    prmNames:{
	    	page:'currentPage',
	    	rows:'pageRows'
	    },
		caption : "失信被执行人信息"//表格的标题名字
	});
	
	$("#dialog").dialog({   //创建dialog弹窗
		title:'失信被执行人信息',
		autoOpen: false,     //不自动打开窗口 
		show:"slide",       //显示弹窗出现的效果，slide为滑动效果 
		hide:"explode",     //显示窗口消失的效果，explode为爆炸效果
		resizable: true,    //设置是否可拉动弹窗的大小，默认为true  
		modal: true,         //是否有遮罩模型  
		width: 600,
		zIndex: 2,
		buttons:[//定义两个button按钮
		    {
		    	text:"确定",
		    	id:'btn_ok',
		    	click:function(){
	    			$.ajax({
						type:'post',//可选get
						async:false,//同步
						url:'../lawRisk/addBreakPromiseExecuted.do',//这里是接收数据的URL
						data:$('#executedItemform').serialize(),//传给后台的数据，多个参数用&连接
						dataType:'json',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
						success:function(msg){
							if(msg.code == -1){
								alert(msg.message);
								//验证插入后，刷新grid
							}else{
								alert("保存成功");
								$("#list2").trigger("reloadGrid");
								$("#dialog").dialog("close");
							}
						},
						error:function(){//修理失败，未能连接
							alert("保存失败，请联系管理员");
						}
					});
		    	}
		    },
		    {
		    	text:"取消",
		    	click:function(){
		    	$(this).dialog("close");
		    }
		    }
		]
	});
	jQuery("#list2").jqGrid('navGrid', '#pager2', {edit : false,add : false,del : false});
	
	$("#add").click(function(){
		//清空原有值
		$('#id').val("");
		$('#caseFilingTime').val("");
		$('#legalPerson').val("");
		$('#organizationNo').val("");
		$('#obligation').val("");
		$('#executedCondition').val("");
		$('#performCondition').val("");
		$('#nonperforming').val("");
		$('#publishTime').val("");
		$('#province').val("");
		$('#accordingNo').val("");
		$('#executeCourt').val("");
		
		//打开对话表
		$("#dialog").dialog("open");
	});
	
	$("#search").click(function(){
		var searchLegalPerson = $('#searchLegalPerson').val();
		var searchOrganizationNo = $('#searchOrganizationNo').val();
		var searchAccordingNo = $('#searchAccordingNo').val();
		var searchExecuteCourt = $('#searchExecuteCourt').val();
		
		$("#list2").jqGrid("setGridParam",{postData:{legalPerson:searchLegalPerson,organizationNo:searchOrganizationNo,accordingNo:searchAccordingNo,executeCourt:searchExecuteCourt},page:1} );//设置查询参数
		$("#list2").trigger("reloadGrid");
	});
});

function getActions(cellvalue, options, rowObject){
    return '<a href="javascript:edit(\''+rowObject.id+'\')">编辑</a>&nbsp;';
}

/**
 * 编辑角色详情
 * @param userId
 */
function edit(breakPromiseId){
	//取得角色信息
	$.ajax({
		type:'post',//可选get
		async:false,//同步
		url:'../lawRisk/getOneBreakPromiseExecuted.do',//这里是接收数据的URL
		data:'breakPromiseId='+breakPromiseId,//传给后台的数据，多个参数用&连接
		dataType:'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
		success:function(msg){
			var userObj = eval("("+msg+")");
			
			//更新信息至roleform并dialog显示
			$('#id').val(userObj.id);
			$('#caseFilingTime').val(userObj.caseFilingTime);
			$('#legalPerson').val(userObj.legalPerson);
			$('#organizationNo').val(userObj.organizationNo);
			$('#obligation').val(userObj.obligation);
			$('#executedCondition').val(userObj.executedCondition);
			$('#performCondition').val(userObj.performCondition);
			$('#nonperforming').val(userObj.nonperforming);
			$('#publishTime').val(userObj.publishTime);
			$('#province').val(userObj.province);
			$('#accordingNo').val(userObj.accordingNo);
			$('#executeCourt').val(userObj.executeCourt);
			
			//打开对话表
			$("#dialog").dialog("open");
		},
		error:function(){//修理失败，未能连接
			alert("保存失败，请联系管理员");
		}
	});
}


function getStatus(cellvalue, options, rowObject){
	if(cellvalue == 1)
		return "有效";
	else
		return "无效";
}