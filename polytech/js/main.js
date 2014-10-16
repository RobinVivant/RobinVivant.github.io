/*
var editor = ace.edit("ace-editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");

var code = ace.edit("ace-code");
code.setTheme("ace/theme/monokai");
code.getSession().setMode("ace/mode/javascript");
//code.setReadOnly(true);


$("#example-exec").on('click', function(){
	//eval(code.getValue());
	eval(editor.getValue());
});

$("#example-clear").on('click', function(){
	$("#output").html("");
});

function output(str){
	$("#output").append("<p>"+str+"</p>");
}
*/
var Hash = {
	KEY_LENGTH : 160,
	hash : function(identifier){
		// discuss at: http://phpjs.org/functions/sha1/
		// original by: Webtoolkit.info (http://www.webtoolkit.info/)
		// improved by: Michael White (http://getsprink.com)
		// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// input by: Brett Zamir (http://brett-zamir.me)
		// example 1: sha1('Kevin van Zonneveld');
		// returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'
		var rotate_left = function (n, s) {
			var t4 = (n << s) | (n >>> (32 - s));
			return t4;
		};
		
		var cvt_hex = function (val) {
			var str = '';
			var i;
			var v;
			for (i = 7; i >= 0; i--) {
				v = (val >>> (i * 4)) & 0x0f;
				str += v.toString(16);
			}
			return str;
		};
		var blockstart;
		var i, j;
		var W = new Array(80);
		var H0 = 0x67452301;
		var H1 = 0xEFCDAB89;
		var H2 = 0x98BADCFE;
		var H3 = 0x10325476;
		var H4 = 0xC3D2E1F0;
		var A, B, C, D, E;
		var temp;
		// utf8_encode
		var str = unescape(encodeURIComponent(identifier));
		var str_len = str.length;
		var word_array = [];
		for (i = 0; i < str_len - 3; i += 4) {
			j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
			word_array.push(j);
		}
		switch (str_len % 4) {
			case 0:
				i = 0x080000000;
				break;
			case 1:
				i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
				break;
			case 2:
				i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
				break;
			case 3:
				i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) <<
				8 | 0x80;
				break;
		}
		word_array.push(i);
		while ((word_array.length % 16) != 14) {
			word_array.push(0);
		}
		word_array.push(str_len >>> 29);
		word_array.push((str_len << 3) & 0x0ffffffff);
		for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
			for (i = 0; i < 16; i++) {
				W[i] = word_array[blockstart + i];
			}
			for (i = 16; i <= 79; i++) {
				W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
			}
			A = H0;
			B = H1;
			C = H2;
			D = H3;
			E = H4;
			for (i = 0; i <= 19; i++) {
				temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B, 30);
				B = A;
				A = temp;
			}
			for (i = 20; i <= 39; i++) {
				temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B, 30);
				B = A;
				A = temp;
			}
			for (i = 40; i <= 59; i++) {
				temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B, 30);
				B = A;
				A = temp;
			}
			for (i = 60; i <= 79; i++) {
				temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B, 30);
				B = A;
				A = temp;
			}
			H0 = (H0 + A) & 0x0ffffffff;
			H1 = (H1 + B) & 0x0ffffffff;
			H2 = (H2 + C) & 0x0ffffffff;
			H3 = (H3 + D) & 0x0ffffffff;
			H4 = (H4 + E) & 0x0ffffffff;
		}
		temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
		return temp.toLowerCase();
	}
}

function Chord(){

	this.nodeList = [];
	
	function createNode( nodeId ){
		var node = new ChordNode(nodeId);
		this.nodeList.push(node);
	}
	
	function getNode( index ){
		return this.nodeList[i];
	}
	
	//public API
	this.createNode = createNode;
	this.getNode = getNode;
}

function ChordNode( nodeId ){
	var nodeKey = new ChordKey(nodeId);
	var predecessor;
	var successor;
	var fingerTable = new FingerTable(this)
	var that = this;
	
	// INTERNALS
	
	function closestPrecedingNode(key) {
		for (var i = Hash.KEY_LENGTH - 1; i >= 0; i--) {
			finger = fingerTable.getFinger(i);
			fingerKey = finger.getNode().getNodeKey();
			if (fingerKey.isBetween(that.getNodeKey(), key)) {
				return finger.getNode();
			}
		}
		return that;
	}
	
	function notifyPredecessor(node) {
		key = node.getNodeKey();
		if (predecessor == null
				|| key.isBetween(predecessor.getNodeKey(), that.getNodeKey())) {
			predecessor = node;
		}
	}
	
	//PUBLIC API
	
	this.create = function(){
		predecessor = null;
		successor = that;
	}
	
	this.findSuccessor = function( identifier ){
		if( identifier instanceof String ){
			var key = new ChordKey(identifier);
			return findSuccessor(key)
		}else if( identifier instanceof ChordKey ){
			var key = identifier;
			
			if (that == successor) {
				return that;
			}

			if ( key.isBetween(that.getNodeKey(), successor.getNodeKey())
					|| key.compareTo(successor.getNodeKey()) == 0) {
				return successor;
			} else {
				var node = closestPrecedingNode(key);
				if (node == that) {
					return successor.findSuccessor(key);
				}
				return node.findSuccessor(key);
			}
		}
	}
	

	this.join = function(node) {
		predecessor = null;
		successor = node.findSuccessor(that.getNodeId());
	}

	this.stabilize = function() {
		node = successor.getPredecessor();
		if (node != null) {
			key = node.getNodeKey();
			if (that == successor
					|| key.isBetween(that.getNodeKey(), successor.getNodeKey())) {
				successor = node;
			}
		}
		successor.notifyPredecessor(that);
	}

	this.fixFingers = function() {
		for (var i = 0; i < Hash.KEY_LENGTH; i++) {
			finger = fingerTable.getFinger(i);
			key = finger.getStart();
			finger.setNode(findSuccessor(key));
		}
	}

	this.toString = function() {
		return "ChordNode[ID=" + nodeId + ",KEY=" + nodeKey + "]";
	}

	this.printFingerTable = function() {
		console.log("=======================================================");
		console.log("FingerTable: " + that);
		console.log("-------------------------------------------------------");
		console.log("Predecessor: " + predecessor);
		console.log("Successor: " + successor);
		console.log("-------------------------------------------------------");
		for (var i = 0; i < Hash.KEY_LENGTH; i++) {
			finger = fingerTable.getFinger(i);
			that(finger.getStart() + "\t" + finger.getNode());
		}
		console.log("=======================================================");
	}

	this.getNodeId = function() {
		return nodeId;
	}

	this.setNodeId = function(nodeId) {
		that.nodeId = nodeId;
	}

	this.getNodeKey = function() {
		return nodeKey;
	}

	this.setNodeKey = function(nodeKey) {
		that.nodeKey = nodeKey;
	}

	this.getPredecessor = function() {
		return predecessor;
	}

	this.setPredecessor = function(predecessor) {
		that.predecessor = predecessor;
	}

	this.getSuccessor = function() {
		return successor;
	}

	this.setSuccessor = function(successor) {
		that.successor = successor;
	}

	this.getFingerTable = function() {
		return fingerTable;
	}

	this.setFingerTable = function(fingerTable) {
		that.fingerTable = fingerTable;
	}
	
	this.create();
	
}

function ChordKey( id ){
	var identifier = "";
	var key = [];
	
	if( id instanceof Array ){
		key = id;	
	}else{
		identifier += id;
		key = Hash.hash(identifier)
	}
	
	// PUBLIC API
	
	this.isBetween = function(fromKey, toKey) {
		if (fromKey.compareTo(toKey) < 0) {
			if (this.compareTo(fromKey) > 0 && this.compareTo(toKey) < 0) {
				return true;
			}
		} else if (fromKey.compareTo(toKey) > 0) {
			if (this.compareTo(toKey) < 0 || this.compareTo(fromKey) > 0) {
				return true;
			}
		}
		return false;
	}

	this.createStartKey = function(index) {
		var newKey = key.slice(0);
		var carry = 0;
		for (var i = (Hash.KEY_LENGTH - 1) / 8; i >= 0; i--) {
			var value = key[i] & 0xff;
			value += (1 << (index % 8)) + carry;
			newKey[i] = value;
			if (value <= 0xff) {
				break;
			}
			carry = (value >> 8) & 0xff;
		}
		return new ChordKey(newKey);
	}

	this.compareTo = function(targetKey) {
		for (var i = 0; i < key.length; i++) {
			var loperand = (this.key[i] & 0xff);
			var roperand = (targetKey.getKey()[i] & 0xff);
			if (loperand != roperand) {
				return (loperand - roperand);
			}
		}
		return 0;
	}

	this.toString = function() {
		var out = "";
		if (key.length > 4) {
			for (var i = 0; i < key.length; i++) {
				out += (key[i] & 0xff) + ".";
			}
		} else {
			var n = 0, i = key.length-1, j = 0;
			for (; i >= 0 ; i--, j++) {
				n |= ((key[i]<<(8*j)) & (0xff<<(8*j)));
			}
			out += n;
		}

		return out;
	}

	this.getIdentifier = function() {
		return identifier;
	}

	this.setIdentifier = function(identifier) {
		this.identifier = identifier;
	}

	this.getKey = function(){
		return key;
	}

	this.setKey = function(key){
		this.key = key;
	}

}

function Finger( startKey, node ){
	
	// PUBLIC API
	this.getStart = function() {
		return startKey;
	}

	this.setStart = function(startKey) {
		this.startKey = startKey;
	}

	this.getNode = function() {
		return node;
	}

	this.setNode = function(node) {
		this.node = node;
	}
}

function FingerTable( node ){
	
	var fingers = [];

	for (var i = 0; i < fingers.length; i++) {
		startKey = node.getNodeKey().createStartKey(i);
		fingers[i] = new Finger(startKey, node);
	}

	this.getFinger = function(i) {
		return fingers[i];
	}
}

chord = new Chord();
var NUM_OF_NODES = 10;
for (var i = 0; i < NUM_OF_NODES; i++) {
	chord.createNode((""+Math.random()).substring(2) % 64);
}
console.log(NUM_OF_NODES + " nodes are created.");

for (var i = 0; i < NUM_OF_NODES; i++) {
	console.log(chord.getNode(i).toString());
}

for (var i = 1; i < NUM_OF_NODES; i++) {
	var node = chord.getNode(i);
	console.log("lol "+node.toString());
	node.join(chord.getNode(0));
	var preceding = node.getSuccessor().getPredecessor();
	node.stabilize();
	if (preceding == null) {
		node.getSuccessor().stabilize();
	} else {
		preceding.stabilize();
	}
}

out.println("Chord ring is established.");
