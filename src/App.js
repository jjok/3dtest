
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
	var scene = this.__scene = new BABYLON.Scene(this.__engine);
	/*var camera =*/ new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this.__scene);
	/*var light =*/ new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 4, 10), this.__scene);
	
//	this.__scene.enablePhysics();
//	this.__scene.setGravity(new BABYLON.Vector3(0, -10, 0));
//	var origin = BABYLON.Mesh.CreateSphere("origin", 10, 1.0, this.__scene);
	
	
	var ground = BABYLON.Mesh.CreateGround("ground", 20, 20, 1, this.__scene, false);
	var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.__scene);
	groundMaterial.specularColor = new BABYLON.Color3(200, 100, 100);
//	groundMaterial.diffuseTexture = new BABYLON.Texture("wood.png", scene);
//	groundMaterial.diffuseTexture.uScale = 2;
//	groundMaterial.diffuseTexture.vScale = 2;
	ground.material = groundMaterial;
	ground.receiveShadows = true;
//	ground.renderingGroupId = 1;
//	console.log(ground);
//	console.log(groundMaterial);
	
	
	var box = BABYLON.Mesh.CreateBox("Box", 3.0, this.__scene);
	box.position = new BABYLON.Vector3(0, 1.5, 0);
//	box.renderingGroupId = 1;
	box.setPhysicsState({
		impostor: BABYLON.PhysicsEngine.SphereImpostor,
		mass: 1
	});
	this.__car = new Car(
		box
	);
	
	this.__control_state = new ControlState(
		37, //left
		39, //right
		32  //space
	);
	var self = this;
	document.addEventListener("keydown", function(e) {
		self.__control_state.keyDown(e.keyCode);
//		console.log(self.__control_state);
	}, false);
	document.addEventListener("keyup", function(e) {
		self.__control_state.keyUp(e.keyCode);
//		console.log(self.__control_state);
	}, false);
	//////////////////////////////////////////
};

App.prototype.__update = function() {
	if(this.__control_state.accelerate) {
		this.__car.accelerate();
	}
	else {
		this.__car.decelerate();
	}
	
	if(this.__control_state.left) {
		this.__car.turnLeft();
	}
	else if(this.__control_state.right) {
		this.__car.turnRight();
	}
	else {
		this.__car.unturn();
	}
	
	this.__car.update();
};

App.prototype.__draw = function() {
	this.__scene.render();
};
