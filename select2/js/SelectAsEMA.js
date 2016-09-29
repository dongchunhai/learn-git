/**
* 模拟 输入邮箱地址效果 dch
*/

function SelectAsEN (inputId, inputVal, dataList, $, callback) {
	this.inputId = inputId;
	this.inputVal = inputVal;
	this.dataList = dataList;
	this.count = 0;
	this.selectedList = [];
	this.selectedFlag = {};
	this.line = "";
	this.optLine = "";
	this._init();
	this.focusThis(inputId);
	this.callback = callback;
	this.blurThis(inputId);
}

SelectAsEN.prototype = {
	_init : function(){
		if (!Array.prototype.indexOf) {
	        Array.prototype.indexOf = function(elt /*, from*/) {
	            var len = this.length >>> 0;
	            var from = Number(arguments[1]) || 0;
	            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
	            if (from < 0)
	                from += len;
	            for (; from < len; from++) {
	                if ( from in this && this[from] === elt)
	                    return from;
	            }
	          return -1;
	        };
	    }
	    this.getInputText(this.inputVal);
	},
	getInputText : function(inputVal){
		var showList = [];
		if(inputVal == ''){
			showList = this.dataList.slice(0);
		} else {
			showList = [];
			for(var i=0; i<this.dataList.length; i++){
				if(this.dataList[i].value.indexOf(inputVal) > -1){
					showList.push(this.dataList[i]);
				}
			}
		}
		//设置下拉框选项
		this.setSelItems(showList);
	},
	setSelItems : function(list){
		if(list.length == 0){
			return false;
		}
		var List = list;
		var id = this.inputId;
		//清空操作
		$("#" + id).siblings('.selectbgFlag_' + this.inputId).remove();
		var line = "";
		line += '<div class="selectbgFlag_';
		line += this.inputId;
		line += '" style="position:absolute;width:100%;background-color:white;z-index:50;text-indent:10px;border: 1px solid #C7C7C7">';
		for(var i = 0; i < List.length; i++){
			line += '<div class="option option_';
			line += List[i].id;
			line += '">';
			line += List[i].value;
			line += '</div>';
		}
		line += '</div>';
		line = $(line);
		$("#" + id).after(line);
		this.bindEventOpt();
	},
	selItem : function(id, value){
		if(selectedFlag[id]){
			alert('This item has been selected');
			return false;
		}
		var selLine = "";
		selLine += '<span class="selected">';
		selLine += value;
		selLine += '<span class="close close_';
		selLine += id;
		selLine += ' close_';
		selLine += this.inputId;
		selLine += '">X';
		selLine += '</span></span>';
		selLine = $(selLine);
		$("#" + this.inputId).before(selLine);
		var temp = {
			'id': id,
			'value': value
		}
		this.selectedList.push(temp);
		selectedFlag[id] = 1;
		$(".selectbgFlag_" + this.inputId).slideUp('fast');
		$('#' + this.inputId).val("");
		this.bindEventSel();
	},
	delItem : function(id, obj){
		$("#"+this.inputId).show();
		$(obj).parent().remove();
	},
	bindEventOpt: function() {
		var optDom = document.querySelectorAll('.selectbgFlag_' + this.inputId);
		var self = this;
		for (var i = 0, len = optDom.length; i < len; i++) {
			optDom[i].addEventListener('click', function(e) {
				var id = e.target.classList[1].split('_')[1];
				var value = e.target.innerText;
				self.callback({'id':id,'value':value}, true);
				self.selItem(id, value);
				
			});
		}
	},
	bindEventSel: function() {
		var closeDom = document.querySelectorAll('.close_' + this.inputId);
		var self = this;
		for (var i = 0, len = closeDom.length; i < len; i++) {
			closeDom[i].addEventListener('click', function(e) {
				var id = e.target.classList[1].split('_')[1];
				self.delItem(id, e.target);
				self.callback({'id':id}, false);
			});
		}
	},
	getItem: function(){
		return this.selectedList[0] ? this.selectedList[0] : null;
	},
	focusThis: function(id){
		$("#"+id).parent().on('click', function(){
			$("#"+id).focus();
		});
	},
	blurThis: function(id){
		$("#"+id).on('blur', function(){
			$(this).val("");		
		});	
	}
}

