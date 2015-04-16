$(document).ready(function() {

	var cell = $("[ng-click^='setOrder']");
	var cellArrow = cell.find('span');

	cellArrow.css("display","none");

	cell.click(function() {
		cellArrow.css("display","none");
		$(this).find('span').css("display","block")
	})

});