package com.igreen.boss.controller.es;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.igreen.boss.controller.BaseController;
import com.igreen.boss.service.es.WordFrequencyService;
import com.igreen.common.model.WordFrequency;
import com.igreen.common.util.ListRange;

@Controller
@RequestMapping(value="/wordfrequency")
public class WordFrequencyController extends BaseController{

	@Resource
	WordFrequencyService wordFrequencyService;
	
	/**
	 * 跳转列表页面
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value="toWordFrequencyList")
	public ModelAndView toWordFrequencyList(HttpServletRequest request,HttpServletResponse response, ModelMap model){
		return new ModelAndView("wordFrequency/wordFrequency.html",model);
	}
	
	
	/**
	 * 分页显示
	 * @param label
	 * @param currentPage
	 * @param pageRows
	 * @return
	 */
	@RequestMapping(value="wordFrequencyList", method = { RequestMethod.POST,RequestMethod.GET })
	public @ResponseBody ListRange wordFrequencyList(WordFrequency frequency,Integer currentPage,Integer pageRows){
		if(currentPage == null)
			currentPage =1;
		if(pageRows == null)
			pageRows = 20;
		return wordFrequencyService.wordFrequencyList(frequency,currentPage,pageRows);
	}
	
}
