
var editor = ace.edit("ace-editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
//editor.setReadOnly(true);
	
$("#example-exec").on('click', function(){
	eval(editor.getValue());
});
	
function Ring(m){

	return {
		nodes : [
			{
				keys : [
				
				],
				table : [
				
				]
			}
		],
		add : function(node){
		
		}
	};
};

function Node( successor ){
	
	return {
		findSuccessor : function(key){
			
		},
		closestPrecedingNode : function(key){
		
		},
		join : function(node){
			predecessor = null;
			successor = node.findSuccessor(this)
		}
	};
};
/*
//find the successor of item in list supposed ordered
function findSuccessor( list, item ){
	for( var i = 0; i < list; i++){
		if( list[i] <= item )
			return list[i-1];
	}
	
	var n0 = closestPrecedingNode(item);
    return findSuccessor(list n0)
}

function closestPrecedingNode(key){

}
*/
function Ring(ids, m){
	var ret = [];
	for( var i in ids ){
		ret.push({
			id: ids[i],
			table : (function(){
				var ret = [];
				for( var j = 0; j < m; j++ ){
					var val = (ids[i]+Math.pow(2, j)) %( Math.pow(2,m));
					val %= (ids[ids.length-1]);
				
					var k;
					for( k = i; k < ids.length; k++){
						if( val <= ids[k] ){
							ret.push(ids[k])
							break;
						}
					}
					if( k == ids.length-1 ){
						for(k = 0; k < i; k++){
							if( val <= ids[k] ){
								ret.push(ids[k])
								break;
							}
						}
					}
					console.log(val);
						
				}
				return ret;	
			})()
		});
	}
	return ret;
};

var ring = new Ring([1, 8, 14, 21, 32, 38, 42, 48, 51, 56], 6);

function lookup(node, ring){
	
}

