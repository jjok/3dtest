
var ControlState = function(left, right, accelerate) {
	this.__keys = {};
	this.__keys["key" + left] = "left";
	this.__keys["key" + right] = "right";
	this.__keys["key" + accelerate] = "accelerate";
	
	this.left = false;
	this.right = false;
	this.accelerate = false;
};

ControlState.prototype.keyDown = function(key) {
	if(typeof this.__keys["key" + key] != "undefined") {
		this[this.__keys["key" + key]] = true;
	}
};

ControlState.prototype.keyUp = function(key) {
	if(typeof this.__keys["key" + key] != "undefined") {
		this[this.__keys["key" + key]] = false;
	}
};
