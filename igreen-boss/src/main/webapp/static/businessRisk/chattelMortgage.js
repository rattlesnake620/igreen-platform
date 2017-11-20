
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
		url : '../businessRisk/chattelMortgageList.do?registItemId='+registItemId,//组件创建完成之后请求数据的url
		datatype : "json",//请求数据返回的类型。可选json,xml,txt
		rownumbers: true,
		colNames : ['<b>抵押ID</b>','<b>抵押人</b>','<b>抵押权人</b>','<b>登记机关</b>','<b>登记日期</b>','<b>状态标识</b>','<b>登记证号</b>','<b>申请抵押原因</b>','<b>被担保主债权种类</b>','<b>被担保主债权数额(万元)</b>','<b>履约起始日期</b>','<b>履约截止日期</b>','<b>注销日期</b>','<b>操作</b>' ],//jqGrid的列显示名字
		colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
		 		    {name:'mortgageId',index:'mortgageId', width:80,sortable:false},
		 		    {name:'mortgagee',index:'mortgagee', width:80,sortable:false},
		 		    {name:'pledgee',index:'pledgee', width:80,sortable:false},
		 		    {name:'registOffice',index:'registOffice', width:80,sortable:false},
		 		    {name:'registTime',index:'registTime', width:80,sortable:false},
		 		    {name:'mortgageStatus',index:'mortgageStatus', width:80,sortable:false},
		 		    {name:'registNo',index:'registNo', width:80,sortable:false},
		 		    {name:'mortgageReason',index:'mortgageReason', width:80,sortable:false},
		 		    {name:'creditorType',index:'creditorType', width:80,sortable:false},
		 		    {name:'creditorAmount',index:'creditorAmount', width:80,sortable:false},
		 		    {name:'beginTime',index:'beginTime', width:80,sortable:false},
		 		    {name:'endTime',index:'endTime', width:80,sortable:false},
		 		    {name:'cancelTime',index:'cancelTime', width:80,sortable:false},
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
		caption : "动产抵押信息"//表格的标题名字
	});
	
	$("#dialog").dialog({   //创建dialog弹窗
		title:'动产抵押信息',
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
						url:'../businessRisk/addChattelMortgage.do',//这里是接收数据的URL
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
	    $('#mortgageId').val("");
	    $('#mortgagee').val("");
	    $('#pledgee').val("");
	    $('#registOffice').val("");
	    $('#registTime').val("");
	    $('#mortgageStatus').val("");
	    $('#registNo').val("");
	    $('#mortgageReason').val("");
	    $('#creditorType').val("");
	    $('#creditorAmount').val("");
	    $('#beginTime').val("");
	    $('#endTime').val("");
	    $('#cancelTime').val("");
	    
		//打开对话表
		$("#dialog").dialog("open");
	});
	
	$("#search").click(function(){
		var searchMortgagee = $('#searchMortgagee').val();
		var searchPledgee = $('#searchPledgee').val();
		
		$("#list2").jqGrid("setGridParam",{postData:{mortgagee:searchMortgagee,pledgee:searchPledgee},page:1} );//设置查询参数
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
function edit(chattelMortgageId){
	//取得角色信息
	$.ajax({
		type:'post',//可选get
		async:false,//同步
		url:'../businessRisk/getOneChattelMortgage.do',//这里是接收数据的URL
		data:'chattelMortgageId='+chattelMortgageId,//传给后台的数据，多个参数用&连接
		dataType:'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
		success:function(msg){
			var userObj = eval("("+msg+")");
			
			//更新信息至roleform并dialog显示
			$('#id').val(userObj.id);
		    $('#mortgageId').val(userObj.mortgageId);
		    $('#mortgagee').val(userObj.mortgagee);
		    $('#pledgee').val(userObj.pledgee);
		    $('#registOffice').val(userObj.registOffice);
		    $('#registTime').val(userObj.registTime);
		    $('#mortgageStatus').val(userObj.mortgageStatus);
		    $('#registNo').val(userObj.registNo);
		    $('#mortgageReason').val(userObj.mortgageReason);
		    $('#creditorType').val(userObj.creditorType);
		    $('#creditorAmount').val(userObj.creditorAmount);
		    $('#beginTime').val(userObj.beginTime);
		    $('#endTime').val(userObj.endTime);
		    $('#cancelTime').val(userObj.cancelTime);
			
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
