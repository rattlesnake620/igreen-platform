package com.igreen.web.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.igreen.web.service.IndexService;
import com.igreen.web.view.Igreen;
import com.igreen.web.view.SearchCompanyInfo;

@Controller
@RequestMapping(value="/index")
public class IndexController {
	
	@Resource
	IndexService indexService;
	
	/**
	 * 跳转到
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value="search")
	public ModelAndView search(HttpServletRequest request,HttpServletResponse response, ModelMap model,String companyName){
		Igreen igreen = indexService.search(companyName);
		model.addAttribute("igreen", igreen);
		return new ModelAndView("search-result.jsp",model);
	}
	
	/**
	 * 通过公司搜索功能
	 * @param model
	 * @param companyName
	 * @return
	 */
	@RequestMapping(value="searchCompany")
	@ResponseBody
	public ModelAndView searchCompany(ModelMap model,String companyName) {
		if(companyName != null){
			SearchCompanyInfo searchInfo = indexService.searchCompany(companyName);
			model.addAttribute("searchInfo", searchInfo);
			return new ModelAndView("searchcompany-result.jsp",model);
		}
		return null;
	}
}
