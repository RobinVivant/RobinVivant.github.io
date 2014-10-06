
var editor = ace.edit("ace-editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");

var code = ace.edit("ace-code");
code.setTheme("ace/theme/monokai");
code.getSession().setMode("ace/mode/javascript");
//code.setReadOnly(true);


$("#example-exec").on('click', function(){
	eval(code.getValue());
	eval(editor.getValue());
});

$("#example-clear").on('click', function(){
	$("#output").html("");
});

function output(str){
	$("#output").append("<p>"+str+"</p>");
}
