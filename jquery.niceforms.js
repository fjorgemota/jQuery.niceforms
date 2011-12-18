/*
Este trabalho foi licenciado com a Licença Creative Commons Atribuição - CompartilhaIgual 3.0 Não Adaptada. Para ver uma cópia desta licença, visite http://creativecommons.org/licenses/by-sa/3.0/ ou envie um pedido por carta para Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.
Autor da versão original: Lucian Slatineanu
Nome da versão original: NiceForms (versão 2.0)
URL: http://www.emblematiq.com/projects/niceforms/


Nome desta versão: jQuery NiceForms 1.0
Autor desta versão:Fernando Jorge Mota
URL:http://fjorgemota.github.com/jQuery.niceforms/
*/
jQuery(function(){
	var o$ = $||jQuery;
	var $ = jQuery;
	if(!$){
		throw("This library need of the jQuery library");
	}
	$.niceforms = function(){
		$("form.niceform").each(function(){
			$(this).niceforms().start();
		});		
	}
	$.noniceforms = function(){
		$("form.niceform").each(function(){
			$(this).niceforms().stop();
		});		
	}
	$.niceforms.imagesPath = "img/";
	$.niceforms.selectRightWidthSimple = 19;
	$.niceforms.selectRightWidthScroll = 2;
	$.niceforms.selectMaxHeight = 200;
	$.niceforms.textareaTopPadding = 10;
	$.niceforms.textareaSidePadding = 10;
	
	$(window).bind("resize",function(){
		$("form.niceform").each(function(){
			$(this).niceforms().stop().niceforms().start();
		});
	});
	var niceforms_functions = {
					"text,password":function(){
						$(this).data({
							"oldClassName":$(this).attr("class")||"",
							"left":$("<img src='"+$.niceforms.imagesPath+"0.png' class='NFTextLeft'/>"),
							"right":$("<img src='"+$.niceforms.imagesPath + "0.png' class='NFTextRight'/>"),
							"dummy":$("<div class='NFTextCenter'/>")
						}).bind({
							"focus":function(){
								$(".NFTextLeft, .NFTextRight, .NFTextCenter").addClass("NFh");
							},
							"blur":function(){
								$(".NFTextLeft, .NFTextRight, .NFTextCenter").removeClass("NFh");
							},
							"nfstart":function(){
								var d = $(this).data();
								if(d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",true);
								$(this).removeClass(d["oldClassName"]).addClass("NFText").before(d["left"]).after(d["right"]);
								d["right"].before(d["dummy"]);
								d["dummy"].append(this);
							},
							"nfstop":function(){
								var p = $(this).parent().parent(),d=$(this).data();
								if(!d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",false);
								$(".NFTextLeft,.NFTextRight,.NFTextCenter",p).remove();
								p.append($(this));
								$(this).removeClass("NFText").addClass($(this).data("oldClassName"));
							}
						});
					},
					"radio":function(){
						$(this).data({
							"oldClassName":$(this).attr("class")||"",
							"dummy":$("<div class='NFRadio "+($(this).is(":checked")?"NFh":"")+"' style='left:"+($(this).offset().left+($.browser.msie?4:0))+"px; top:"+($(this).offset().top+($.browser.msie?4:0))+"px' />").data("ref",$(this)).click(function(){
								$("input[name=\""+$(this).data("ref").attr("name")+"\"]").not(":checked").each(function(){
									$(this).attr("checked",false).data("dummy").removeClass("NFh");
								});
								$(this).attr("checked",true).addClass("NFh");
							})
						}).bind({
							"click":function(){
								$("input[name=\""+$(this).data("ref").attr("name")+"\"]").not(":checked").each(function(){
										$(this).data("dummy").removeClass("NFh");
								});
								$(this).addClass("NFh");
							},
							"focus":function(){
								$(this).addClass("NFfocused");
							},
							"blur":function(){
								$(this).removeClass("NFfocused");
							},
							"nfstart":function(){
								var d = $(this).data();
								if(d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",true);
								$(this).removeClass(d["oldClassName"]).addClass("NFhidden");
								$(this).before(d["dummy"]);
							},
							"nfstop":function(){
								var d = $(this).data();
								if(!d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",false);
								$(this).removeClass("NFhidden").addClass(d["oldClassName"]);
								d["dummy"].remove();
							}
						});
					},
					"checkbox":function(){
						$(this).data({
							"oldClassName":$(this).attr("class")||"",
							"dummy":$("<img src='"+$.niceforms.imagesPath+"0.png' class='NFCheck "+($(this).is(":checked")?"NFh":"")+"' style='left:"+($(this).offset().left+($.browser.msie?4:0))+"px; top:"+($(this).offset().top+($.browser.msie?4:0))+"px;'/>").data("ref",$(this)).click(function(){
									$(this)[!$(this).data("ref").is(":checked")?"addClass":"removeClass"]("NFh").data("ref").each(function(){
									this.checked = $(this).is(":checked")?false:true;
								});
							})
						}).bind({
							"click":function(){
								$(this).data("dummy")[$(this).is(":checked")?"addClass":"removeClass"]("NFh");
							},
							"focus":function(){
								$(this).addClass("NFfocused");
							},
							"blur":function(){
								$(this).removeClass("NFfocused");
							},
							"nfstart":function(){
								var d = $(this).data();
								if(d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",true);
								$(this).removeClass(d["oldClassName"]).addClass("NFhidden").before(d["dummy"]);
							},
							"nfstop":function(){
								var d = $(this).data();
								if(!d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",false);
								$(this).removeClass("NFhidden").addClass(d["oldClassName"]);
								d["dummy"].remove();
							}
						});
					},
					"submit,button,reset":function(){	
						$(this).data({
							"oldClassName":$(this).attr("class")||"",
							"left":$("<img class='NFButtonLeft' src='"+$.niceforms.imagesPath+"0.png' />"),
							"right":$("<img class='NFButtonRight' src='"+$.niceforms.imagesPath+"0.png' />")
						}).bind({
							"mouseover":function(){
								$(this).addClass("NFh").prev(".NFButtonLeft").addClass("NFh").next().next(".NFButtonRight").addClass("NFh");
							},
							"mouseout":function(){
								$(this).removeClass("NFh").next(".NFButtonRight").removeClass("NFh").prev().prev(".NFButtonLeft").removeClass("NFh");
							},
							"nfstart":function(){
								var d = $(this).data();	
								if(d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",true);		
								$(this).before(d["left"]);
								$(this).after(d["right"]);
								$(this).attr("class","NFButton");
							},
							"nfstop":function(){
								var d = $(this).data();
								if(!d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",false);
								$(this).removeClass("NFButton").addClass(d["oldClassName"]);
								d["left"].remove();
								d["right"].remove();
							}
						});
					},
					"file":function(){
						var mc = function(){$(this).data("relatedElement").val($(this).val())};
						$(this).data({
							"oldClassName":$(this).attr("class"),
							"dummy":$("<div class='NFFile'/>"),
							"file":$("<div class='NFFileNew'/>"),
							"center":$("<div class='NFTextCenter'/>"),
							"relatedElement":$("<input type='text' class='NFText' />").data("ref",this),
							"left":$("<img src='"+$.niceforms.imagesPath+"0.png' class='NFTextLeft'/>"),
							"button":$("<img src='"+$.niceforms.imagesPath+"0.png' class='NFFileButton'/>").data("ref",this).click(function(){$(this).data("ref").trigger("click")})
						}).bind({
							"change":mc,
							"mouseout":mc,
							"focus":function(){
								var d = $(this).data();
								d["left"].addClass("NFh");
								d["center"].addClass("NFh");
								d["button"].addClass("NFh");
							},
							"blur":function(){
								var d = $(this).data();
								d["left"].removeClass("NFh");
								d["center"].removeClass("NFh");
								d["button"].removeClass("NFh");
							},
							"select":function(){
								$(this).val("").data("relatedElement").select();
							},
							"nfstart":function(){
								var top = $(this).parent(),d= $(this).data();
								if(d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",true);
								if($(this).prev().length>0) {var where = $(this).prev();}
								else {var where = $(":first",top);}
								where.before(d["dummy"]);
								d["dummy"].append(this);
								d["center"].append(d["relatedElement"]);
								d["file"].append(d["center"]);
								d["center"].before(d["left"]);
								d["file"].append(d["button"]);
								d["dummy"].append(d["file"]);
								$(this).removeClass(d["oldClassName"]).addClass("NFhidden");
							},
							"nfstop":function(){
								var d = $(this).data();
								if(!d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",false);
								$(this).removeClass("NFhidden").addClass(d["oldClassName"]).parent().parent().append(this);
								d["dummy"].remove();
								
							}
							});
					},
					"textarea":function(){
						$(this).data({
							"oldClassName":$(this).attr("class"),
							"topLeft":$("<img src='"+$.niceforms.imagesPath+"0.png' class='NFTextareaTopLeft'/>"),
							"topRight":$("<div class='NFTextareaTop' />"),
							"bottomLeft":$("<img src='"+$.niceforms.imagesPath+"0.png' class='NFTextareaBottomLeft' />"),
							"bottomRight":$("<div class='NFTextareaBottom' />"),
							"left":$("<div class='NFTextareaLeft' />"),
							"right":$("<div class='NFTextareaRight' />"),
							"width":($(this).outerWidth()-$.niceforms.textareaSidePadding)+"px",
							"height":($(this).outerHeight()-$.niceforms.textareaTopPadding)+"px"
						}).bind({
							"focus":function(){
								var d = $(this).data();
								d['topLeft'].addClass("NFh");
								d['topRight'].addClass("NFhr");
								d['left'].removeClass("NFTextareaLeft").addClass("NFTextareaLeftH");
								d['right'].removeClass("NFTextareaRight").addClass("NFTextareaRightH");
								d['bottomLeft'].addClass("NFh");
								d['bottomRight'].addClass("NFhr");
							},
							"blur":function(){
								var d = $(this).data();
								d['topLeft'].removeClass("NFh");
								d['topRight'].removeClass("NFhr");
								d['left'].addClass("NFTextareaLeft").removeClass("NFTextareaLeftH");
								d['right'].addClass("NFTextareaRight").removeClass("NFTextareaRightH");
								d['bottomLeft'].removeClass("NFh");
								d['bottomRight'].removeClass("NFhr");
							},
							"nfstart":function(){
								var top = $(this).parent(),d = $(this).data();
								if(d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",true);
								$(this).css({
									"width":d["width"],
									"height":d["height"]
								}).removeClass(d["oldClassName"]).addClass("NFTextarea");
								if($(this).prev().length>0) {var where =  $(this).prev();}
								else {var where = $(":first",top);}
								$(where).before(d["topRight"]);
								d["topRight"].append(d["topLeft"]);
								d["topRight"].css("width",d["width"]);
								$(where).before(d["right"]);
								d["left"].css("height",d["height"]);
								d["right"].css("height",d["height"]);
								d["right"].append(d["left"])
								$(where).before(d["bottomRight"]);
								d["bottomRight"].css("width",d["width"]);
								d["bottomRight"].append(d["bottomLeft"])
								d["right"].append(this)
							},
							"nfstop":function(){
								var d = $(this).data();
								if(!d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",false);
								$(this).parent().parent().append(this);
								$(this).css({"width":"","height":""}).addClass(d["oldClassName"]).removeClass("NFTextarea");
								;
								d["topRight"].remove();
								d["bottomRight"].remove();
								d["right"].remove();
							}
						});
					},
					"select":function(){
						if(($(this).attr("size")||"1")=="1"){
							$(this).data({
								"oldClassName":$(this).attr("class"),
								"dummy":$("<div class='NFSelect' style='width:"+$(this).outerWidth()+"px;left:"+$(this).offset().left+"px;top:"+$(this).offset().top+"px;'/>").data("ref",$(this)).bind({
									"click":function(){
										var r = $(this).data("ref"),d = r.data("bg");
										r.data("opt").css({
											"width":r.outerWidth()-(r.data("opt").outerWidth()>$.niceforms.selectMaxHeight ? $.niceforms.selectRightWidthScroll:$.niceforms.selectRightWidthSimple)+33+"px"
										});
										r.data("bg").css({
											"width":r.outerWidth()-(r.data("opt").outerWidth()>$.niceforms.selectMaxHeight ? $.niceforms.selectRightWidthScroll:$.niceforms.selectRightWidthSimple)+33+"px"
										});
										(d.is(":hidden")?function(){d.show()}:function(){d.hide()})();
										
									},
									"mouseout":function(e){
										e.stopPropagation();
										if(!$(e.relatedTarget).is("a,li,ul,div,.NFSelectTarget")){$(this).data("ref").data("bg").hide();}
									}
								}),
								"left":$("<img src='"+$.niceforms.imagesPath+"0.png' class='NFSelectLeft' />"),
								"right":$("<div class='NFSelectRight' />"),
								"bg":$("<div class='NFSelectTarget'></div>").hide().mouseout(function(e){
									e.stopPropagation();
									if(!$(e.relatedTarget).is("a,li,ul,div,.NFSelectTarget")){$(this).hide();}
								}),
								"opt":$("<ul class='NFSelectOptions' />")
							}).bind({
								"focus":function(){
									$(this).data("dummy").addClass("NFfocused");
								},
								"blur":function(){
									$(this).data("dummy").removeClass("NFfocused");
								},
								"keydown":function(e){
									var active = this.selectedIndex;
									({40:function(){
											if(active < this.options.length - 1) {
												$("option.NFOptionActive",this).each(function(){
													$(this).data("lnk").removeClass("NFOptionActive");
												});
												$("option",this).eq(active + 1).data("lnk").addClass("NFOptionActive");
												$("div:first",$(this).data("dummy")).html(this.options[newOne].text);
											}
											return false;
									},
									38:function(){
											if(active > 0) {
												$("option.NFOptionActive",this).each(function(){
													$(this).data("lnk").removeClass("NFOptionActive");
												});
												$("option",this).eq(active - 1).data("lnk").addClass("NFOptionActive");
												$("div:first",$(this).data("dummy")).html(this.options[newOne].text);
											}
											return false;	
									}})[e.which].apply(this,[]);
									},
								"nfstart":function(){
									var d = $(this).data();
									if(d["niceformenabled"]){
										return;
									}
									$(this).data("niceformenabled",true);
									d["right"].append(d["txt"]);
									d["dummy"].append(d["left"]).append(d["right"]);
									d["bg"].append(d["opt"]).appendTo(d["dummy"]);
									$("option",this).each(function(i){
										$(this).data({
											"li":$("<li />"),
											"lnk":$("<a href='javascript:void(0);'></a>").text($(this).text()).data({
												"ref":$(this).parent(),
												"pos":i
											}).click(function(){
													$("option.NFOptionActive",$(this).data("ref")).each(function(){
														$(this).data("lnk").removeClass("NFOptionActive");
													});
													$("option",$(this).data("ref")).eq($(this).data("pos")).trigger("nfselect");
												}
											)
										}).bind("nfselect",function(){
													$("div:first",$(this).parent().data("dummy")).html($("option:eq("+$(this).data("lnk").data("pos")+")",$(this).parent()).attr("selected","selected").text());
													$(this).parent().addClass("NFOptionActive");
												});
										$(this).data("li").append($(this).data("lnk")).appendTo(d["opt"]);;
									});
									$("option:selected",this).trigger("nfselect");
									$(this).parent().before(d["dummy"].css({
										"z-index":999-$("select").index(this)
									})).removeClass(d["oldClassName"]).addClass("NFhidden");
								},
							"nfstop":function(){
								var d = $(this).data();
								if(!d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",false);
								d["dummy"].remove();
								$(this).parent().removeClass("NFhidden").addClass(d["oldClassName"]);
							}
						});
					}
					else{
						$(this).data({
							"oldClassName":$(this).attr("class"),
							"height":$(this).outerHeight()+"px",
							"width":$(this).outerWidth()+"px",
							"topLeft":$("<img src='"+$.niceforms.imagesPath+"0.png' class='NFMultiSelectTopLeft' />"),
							"topRight":$("<div class='NFMultiSelectTop' />"),
							"bottomLeft":$("<img src='"+$.niceforms.imagesPath+"0.png' class='NFMultiSelectBottomLeft' />"),
							"bottomRight":$("<div class='NFMultiSelectBottom' />"),
							"left":$("<div class='NFMultiSelectLeft' />"),
							"right":$("<div class='NFMultiSelectRight' />")
						}).bind({
							"focus":function(){
								var d = $(this).data();
								d["topLeft"].addClass("NFh");
								d["topRight"].addClass("NFhr");
								d["left"].removeClass("NFMultiSelectLeft").addClass("NFMultiSelectLeftH");
								d["right"].removeClass("NFMultiSelectRight").addClass("NFMultiSelectRightH");
								d["bottomLeft"].addClass("NFh");
								d["bottomRight"].addClass("NFhr");
							},
							"blur":function(){
								var d = $(this).data();
								d["topLeft"].removeClass("NFh");
								d["topRight"].removeClass("NFhr");
								d["left"].addClass("NFMultiSelectLeft").removeClass("NFMultiSelectLeftH");
								d["right"].addClass("NFMultiSelectRight").removeClass("NFMultiSelectRightH");
								d["bottomLeft"].removeClass("NFh");
								d["bottomRight"].removeClass("NFhr");
							},
							"nfstart":function(){
								var top = $(this).parent(),d = $(this).data();
								if(d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",true);
								if($(this).prev().length>0) {var where = $(this).prev();}
								else {var where = $(":first",top);}
								$(this).css({
									"width":d["width"],
									"height":d["height"]
								}).removeClass(d["oldClassName"]).addClass("NFMultiSelect");
								d["bottomRight"].css("width",d["width"]);								
								$(where).before(d["topRight"]);
								$(where).before(d["right"]);
								$(where).before(d["bottomRight"]);
								d["topRight"].css("width",d["width"]).append(d["topLeft"]);
								d["bottomRight"].append(d["bottomLeft"]);
								d["right"].css("height",d["height"]).append(d["left"].css("height",d["height"])).append($(this));
							},
							"nfstop":function(){
								var d = $(this).data();
								if(!d["niceformenabled"]){
									return;
								}
								$(this).data("niceformenabled",false);
								$(this).parent().parent().append(this);
								d["topRight"].remove();
								d["bottomRight"].remove();
								d["right"].remove();
								$(this).removeClass("NFMultiSelect").addClass(d["oldClassName"]).css({"width":"","height":""});
							}
						});
						}
					}
				};
	$.fn.niceforms = function(){
		var nf = this;
		return {
			"start":function() {
				if($(nf).data("niceforms-elements")){
					return $(nf);
				}
			//Separate and assign elements
			$("input,button,textarea,select",nf).each(function(){
				var i = $(nf).data("niceforms-elements")||[];
				i.push(this);
				$(nf).data("niceforms-elements",i);
				for(var k in niceforms_functions){
					if(k.match($(this).attr("type")||this.nodeName.toLowerCase())){
						niceforms_functions[k].apply(this,[]);
						break;
					}
				}
			}).trigger("nfstart");
			return $(nf);
			},
			"stop":function(){
				$($(nf).data("niceforms-elements")||[]).trigger("nfstop");
				$(nf).data("niceforms-elements",null);
				return $(nf);
			}
		}
	}
	window.$ = o$;
});