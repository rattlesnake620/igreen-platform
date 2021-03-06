<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="../ztree/css/zTreeStyle/zTreeStyle.css">
	<link rel="stylesheet" type="text/css" media="screen" href="../static/jqgrid/css/ui.jqgrid.css" />
	<link rel="stylesheet" type="text/css" media="screen" href="../static/css/jqueryui/jquery-ui-1.10.4.custom.min.smoothness.css" />
	<script type="text/javascript" src="../static/js/jquery-1.9.1.js"></script>
	<script type="text/javascript" src="../static/js/ui/jquery-ui-1.10.4.custom.min.smoothness.js"></script>
	<script type="text/javascript" src="../ztree/js/jquery.ztree.core.js"></script>
	<script type="text/javascript" src="../ztree/js/jquery.ztree.excheck.js"></script>
	<script type="text/javascript" src="../ztree/js/jquery.ztree.exedit.js"></script>
	
	<script type="text/javascript" src="../static/jqgrid/js/i18n/grid.locale-cn.js"></script>
	<script type="text/javascript" src="../static/jqgrid/js/jquery.jqGrid.src.js"></script>
	<link rel="stylesheet" href="../static/css/style_new.css">

    <!-- 日期插件 -->
    <script type="text/javascript" src="../static/laydate/laydate.dev.js"></script>

	<!-- 本页面初始化用到的js包，创建jqGrid的代码就在里面 -->
	<script type="text/javascript" src="../static/lawRisk/writtenJudgement.js"></script>

<title>用户管理</title>
</head>
<body>
	<div class="rightinfo">
		<div class="formbody">
			<div id="usual1" class="usual">
				<div class="itab">
					<ul>
						<li><a href="../lawRisk/toOpenCourtList.do?id=${id}">开庭公告</a></li>
						<li><a href="../lawRisk/toWrittenJudgementList.do?id=${id}" class="selected">裁判文书信息</a></li>
						<li><a href="../lawRisk/toExecutedItemList.do?id=${id}">被执行人信息</a></li>
						<li><a href="../lawRisk/toBreakPromiseExecutedList.do?id=${id}">失信被执行人信息</a></li>
						<li><a href="../lawRisk/toCourtNoticeList.do?id=${id}">法院公告</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="tools">
			<ul class="toolbar">
				<li>标题：<input id="searchCaseType"	name="searchCaseType" type="text" class="searchinput" /></li>
				<li>标题：<input id="searchCaseTitle"	name="searchCaseTitle" type="text" class="searchinput" /></li>
				<li class="click" id="search"><span><img src="../static/images/ico06.png" /></span></li>
				<li class="click" id="add"><span><img src="../static/images/t01.png" /></span>添加</li>
			</ul>
		</div>
		<table id="list1"></table>
		</br>
		<table id="list2"></table>
		<div id="pager2" class="pagin"></div>
		
		<div id="dialog" title="裁判文书信息">
			<form class="judgementform" id="judgementform">
				<input type="hidden" id="id" name="id" value="" />
				<input type="hidden" name="registItemId" id="registItemId" value="${id}"/>
				<ul class="forminfo">
					<li><label>时间</label><input id="caseTime" name="caseTime" onclick="laydate({istime: true, format: 'YYYY-MM-DD'})" class="dfinput" /></li>
					<li><label>案件类型</label><input id="caseType" name="caseType" type="text" class="dfinput" /></li>
					<li><label>标题</label><input id="caseTitle" name="caseTitle" type="text" class="dfinput" /></li>
				</ul>
			</form>
		</div>
	</div>
</body>
</html>