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
<title>软件著作权信息</title>
<!-- 本页面初始化用到的js包，创建jqGrid的代码就在里面 -->
<script type="text/javascript" src="../static/intellectual/softwareCopyright.js"></script>
</head>
<body>
	<div class="rightinfo">
		<div class="formbody">
			<div id="usual1" class="usual">
				<div class="itab">
					<ul>
						<li><a href="../intellectual/toPatentList.do?id=${id}">专利信息</a></li>
						<li><a href="../intellectual/toBrandList.do?id=${id}">商标信息</a></li>
						<li><a href="../intellectual/toCopyrightList.do?id=${id}">著作权信息</a></li>
						<li><a href="../intellectual/toSoftwareCopyrightList.do?id=${id}" class="selected">软件著作权信息</a></li>
						<li><a href="../intellectual/toDomainNameList.do?id=${id}">域名信息</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="tools">
			<ul class="toolbar">
				<li>软件简称：<input id="searchSoftwareShopName"	name="searchSoftwareShopName" type="text" class="searchinput" /></li>
				<li>分类号：<input id="searchClassifyNo"	name="searchClassifyNo" type="text" class="searchinput" /></li>
				<li class="click" id="search"><span><img src="../static/images/ico06.png" /></span></li>
				<li class="click" id="add"><span><img src="../static/images/t01.png" /></span>添加</li>
			</ul>
		</div>
		<table id="list1"></table>
		</br>
		<table id="list2"></table>
		<div id="pager2" class="pagin"></div>
		
		<div id="dialog" title="软件著作权信息">
			<form class="shareholderform" id="shareholderform">
				<input type="hidden" id="id" name="id" value="" />
				<input type="hidden" name="registItemId" id="registItemId" value="${id}"/>
				<ul class="forminfo">
					<li><label>软件名称</label><input id="softwareName" name="softwareName" type="text" class="dfinput" /></li>
					<li><label>软件简称</label><input id="softwareShopName" name="softwareShopName" type="text" class="dfinput" /></li>
					<li><label>登记号</label><input id="registNo" name="registNo" type="text" class="dfinput" /></li>
					<li><label>版本号</label><input id="softwareVersion" name="softwareVersion" type="text" class="dfinput" /></li>
					<li><label>分类号</label><input id="classifyNo" name="classifyNo" type="text" class="dfinput" /></li>
					<li><label>登记批准日期</label><input id="approveRegistTime" name="approveRegistTime" onclick="laydate({istime: true, format: 'YYYY-MM-DD'})" class="dfinput" /></li>
				</ul>
			</form>
		</div>
	</div>
</body>
</html>