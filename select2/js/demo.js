
var selectedList = [];//存放用户所选取的条目
var count = 3;//用于限制最多可选取的个数
var selectedFlag = {};//选择标志
function getInputText (id, val){
	//下拉列表的可选数据（全部）
	var dataList = [
		{'id': '10001', 'value': '刘备'},
		{'id': '10002', 'value': '关羽'},
		{'id': '10003', 'value': '张飞'},
		{'id': '10004', 'value': '诸葛亮'},
		{'id': '10005', 'value': '赵云'},
		{'id': '10006', 'value': '马超'},
		{'id': '10007', 'value': '黄忠'},
		{'id': '10008', 'value': '魏延'},
		{'id': '10009', 'value': '马岱'},
		{'id': '10010', 'value': '关心'},
		{'id': '10011', 'value': '张苞'},
		{'id': '10012', 'value': '黄祖'},
		{'id': '10013', 'value': '姜维'},
		{'id': '10014', 'value': '徐庶'},
		{'id': '10015', 'value': '黄月英'},
		{'id': '10016', 'value': '刘禅'}
	];
	var selectAsEN = new SelectAsEN(id, val, dataList, window.$, function(data, flag){
		if(data && flag){
			//添加操作
			if(selectedFlag[data.id]){
				return false;
			}
			selectedList.push(data);
			if(selectedList.length == count){
				$("#"+this.inputId).hide();
			}
		} else if(data && !flag) {
			//删除操作
			for(var i=0, len=selectedList.length; i < len; i++) {
				if(selectedList[i].id == data.id) {
					selectedFlag[data.id] = null;
					selectedList.splice(i, 1);
				}
			}
		}
	});
	//所选取的项
	console.log(selectedList);
}



