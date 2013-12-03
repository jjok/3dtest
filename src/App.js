
var App = function(canvas) {
	this.__canvas = canvas;
};

App.prototype.run = function() {
	this.__init();
	
	var self = this;
	// Once the scene is loaded, just register a render loop to render it
	this.__engine.runRenderLoop(function () {
		self.__update();
		self.__draw();
	});
};

App.prototype.__init = function() {
	
	// Load BABYLON 3D engine
	this.__engine = new BABYLON.Engine(this.__canvas, true);
	
	// Move this ////////////////////////////////////////
	this.__scene = new BABYLON.Scene(this.__engine);
	var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this.__scene);
	var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 0, 10), this.__scene);
	
//	var origin = BABYLON.Mesh.CreateSphere("origin", 10, 1.0, this.__scene);
	var box = BABYLON.Mesh.CreateBox("Box", 6.0, this.__scene);
//	box.position
	
	
	//////////////////////////////////////////
};

App.prototype.__update = function() {

};

App.prototype.__draw = function() {
	this.__scene.render();
};