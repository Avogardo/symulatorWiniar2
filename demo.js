var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light, light2, light3, shiplight;

var polsza, polszaTexture;
var brama, bramaTexture;
var bruksela, brukselaTexture;
var ksiezyc, ksiezycTexture;
var kukle, kukleTexture;
var penis, penisTexture;
var sklad, skladTexture;
var zc, zcTexture;
var zc2, zc2Texture;
var znic, znicTexture;
var znic2, znic2Texture;
var znicL1, znicL1Texture, znicL2, znicL2Texture, znicL3, znicL3Texture;

var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;

var loadingScreen = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 100),
	box: new THREE.Mesh(
		new THREE.BoxGeometry(0.5,0.5,0.5),
		new THREE.MeshBasicMaterial({ color:0x4444ff })
	)
};
var loadingManager = null;
var RESOURCES_LOADED = false;

var models = {
	Lightpost_01: {
		obj:"models/Lightpost_01.obj",
		mtl:"models/Lightpost_01.mtl",
		mesh: null
	},

	OakDark1: {
		obj:"models/Oak_Dark_01.obj",
		mtl:"models/Oak_Dark_01.mtl",
		mesh: null
	},

	Oak_Green: {
		obj:"models/Oak_Green_01.obj",
		mtl:"models/Oak_Green_01.mtl",
		mesh: null
	},

	Oak_Fall: {
		obj:"models/Oak_Fall_01.obj",
		mtl:"models/Oak_Fall_01.mtl",
		mesh: null
	},

	Grass: {
	obj:"models/Grass_01.obj",
	mtl:"models/Grass_01.mtl",
	mesh: null
	},

	tree1: {
	obj:"models/Tree_01.obj",
	mtl:"models/Tree_01.mtl",
	mesh: null
	},

	tree2: {
	obj:"models/Tree_02.obj",
	mtl:"models/Tree_02.mtl",
	mesh: null
	},

	water: {
	obj:"models/roadTile_001.obj",
	mtl:"models/roadTile_001.mtl",
	mesh: null
	},

	ship: {
	obj:"models/watercraftPack_003.obj",
	mtl:"models/watercraftPack_003.mtl",
	mesh: null
	}




};






var meshes = {};

function init(){
	scene = new THREE.Scene();			//fov, res,
	camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);

	loadingScreen.box.position.set(0,0,5);
	loadingScreen.camera.lookAt(loadingScreen.box.position);
	loadingScreen.scene.add(loadingScreen.box);

	loadingManager = new THREE.LoadingManager();
	loadingManager.onProgress = function(item, loaded, total){
		console.log(item, loaded, total);
	};
	loadingManager.onLoad = function(){
		console.log("loaded all resources");
		RESOURCES_LOADED = true;
		onResourcesLoaded();
	};

	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	);
	mesh.position.set(-25, 1, -6);
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	scene.add(mesh);

	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(100,100, 10,10),
		new THREE.MeshPhongMaterial({color:0x143317, wireframe:USE_WIREFRAME})
	);
	meshFloor.rotation.x -= Math.PI / 2;
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);


// ============================================== LIGHTS ==============================================
	ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
	scene.add(ambientLight);

	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(-27.6, 8, -10);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);




	light2 = new THREE.PointLight(0xffffff, 0.8, 18);
	light2.position.set(9, 8, -2);
	light2.castShadow = true;
	light2.shadow.camera.near = 0.1;
	light2.shadow.camera.far = 5;
	scene.add(light2);





	light3 = new THREE.PointLight(0xffffff, 0.8, 18);
	light3.position.set(25, 8, -10);
	light3.castShadow = true;
	light3.shadow.camera.near = 0.1;
	light3.shadow.camera.far = 25;
	scene.add(light3);


	shiplight = new THREE.PointLight(0xffffff, 0.8, 18);
	shiplight.position.set(-54, 8, -13);
	shiplight.castShadow = true;
	shiplight.shadow.camera.near = 0.1;
	shiplight.shadow.camera.far = 5;
	scene.add(shiplight);



// ============================================== Meshes ===========================================
	//Polsza
	var textureLoader = new THREE.TextureLoader();
	polszaTexture = textureLoader.load("img/polsza.png");

	polsza = new THREE.Mesh(
		new THREE.BoxGeometry(6.5,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:polszaTexture
		})
	);
	scene.add(polsza);
	polsza.position.set(-25, 3/2, -2);
	polsza.receiveShadow = true;
	polsza.castShadow = true;

	//zc
	var textureLoader = new THREE.TextureLoader();
	zcTexture = textureLoader.load("img/zc.png");

	zc = new THREE.Mesh(
		new THREE.BoxGeometry(2.06,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:zcTexture
		})
	);
	scene.add(zc);
	zc.position.set(-29.4+(2.06-(1.03*Math.sqrt(3))), 3/2, -2.515);
	zc.receiveShadow = true;
	zc.castShadow = true;
	zc.rotation.y = -Math.PI/6;

	//brama
	var textureLoader = new THREE.TextureLoader();
	bramaTexture = textureLoader.load("img/brama.png");

	brama = new THREE.Mesh(
		new THREE.BoxGeometry(7.8,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:bramaTexture
		})
	);
	scene.add(brama);
	brama.position.set(-17-(7.8*(Math.sqrt(6)-Math.sqrt(2))/8), 3/2, -2-(7.8*(Math.sqrt(6)-Math.sqrt(2))/8));
	brama.receiveShadow = true;
	brama.castShadow = true;
	brama.rotation.y = Math.PI/12;

	//zc2
	var textureLoader = new THREE.TextureLoader();
	zc2Texture = textureLoader.load("img/zc2.png");

	zc2 = new THREE.Mesh(
		new THREE.BoxGeometry(3.72,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:zc2Texture
		})
	);
	scene.add(zc2);
	zc2.position.set(-12.4, 3/2, -2-2*(7.8*(Math.sqrt(6)-Math.sqrt(2))/8));
	zc2.receiveShadow = true;
	zc2.castShadow = true;

	//bruksela
	var textureLoader = new THREE.TextureLoader();
	brukselaTexture = textureLoader.load("img/bruksela.png");

	bruksela = new THREE.Mesh(
		new THREE.BoxGeometry(11.1,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:brukselaTexture
		})
	);
	scene.add(bruksela);
	bruksela.position.set(-5, 3/2, -2-2*(7.8*(Math.sqrt(6)-Math.sqrt(2))/8));
	bruksela.receiveShadow = true;
	bruksela.castShadow = true;

	//znic
	var textureLoader = new THREE.TextureLoader();
	znicTexture = textureLoader.load("img/znic.png");

	znic = new THREE.Mesh(
		new THREE.BoxGeometry(4.1,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:znicTexture
		})
	);
	scene.add(znic);
	znic.position.set(2.6, 3/2, -1.99-2*(7.8*(Math.sqrt(6)-Math.sqrt(2))/8));
	znic.receiveShadow = true;
	znic.castShadow = true;

	//sklad
	var textureLoader = new THREE.TextureLoader();
	skladTexture = textureLoader.load("img/sklad.png");

	sklad = new THREE.Mesh(
		new THREE.BoxGeometry(6.2,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:skladTexture
		})
	);
	scene.add(sklad);
	sklad.position.set(7.75, 3/2, -4);
	sklad.receiveShadow = true;
	sklad.castShadow = true;

	//penis
	var textureLoader = new THREE.TextureLoader();
	penisTexture = textureLoader.load("img/penis.png");

	penis = new THREE.Mesh(
		new THREE.BoxGeometry(6.13,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:penisTexture
		})
	);
	scene.add(penis);
	penis.position.set(13.915, 3/2, -4);
	penis.receiveShadow = true;
	penis.castShadow = true;

	//znic2
	var textureLoader = new THREE.TextureLoader();
	znic2Texture = textureLoader.load("img/znic2.png");

	znic2 = new THREE.Mesh(
		new THREE.BoxGeometry(3.78,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:znic2Texture
		})
	);
	scene.add(znic2);
	znic2.position.set(18.87, 3/2, -4);
	znic2.receiveShadow = true;
	znic2.castShadow = true;

	//ksiezyc
	var textureLoader = new THREE.TextureLoader();
	ksiezycTexture = textureLoader.load("img/ksiezyc.png");

	ksiezyc = new THREE.Mesh(
		new THREE.BoxGeometry(6,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:ksiezycTexture
		})
	);
	scene.add(ksiezyc);
	ksiezyc.position.set(23.76, 3/2, -4);
	ksiezyc.receiveShadow = true;
	ksiezyc.castShadow = true;

	//kukle
	var textureLoader = new THREE.TextureLoader();
	kukleTexture = textureLoader.load("img/kukle.png");

	kukle = new THREE.Mesh(
		new THREE.BoxGeometry(6.96,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:kukleTexture
		})
	);
	scene.add(kukle);
	kukle.position.set(30.24, 3/2, -4);
	kukle.receiveShadow = true;
	kukle.castShadow = true;

////////////////////////////////////////////////////
//////////////////// LEFT WALL /////////////////////
////////////////////////////////////////////////////

	//znic 1
	var textureLoader = new THREE.TextureLoader();
	znicL1Texture = znicTexture;

	znicL1 = new THREE.Mesh(
		new THREE.BoxGeometry(7,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:znicL1Texture
		})
	);
	scene.add(znicL1);
	znicL1.position.set(33.72, 3/2, -0.5);
	znicL1.receiveShadow = true;
	znicL1.castShadow = true;
	znicL1.rotation.y = -Math.PI/2;

	//znic 2
	var textureLoader = new THREE.TextureLoader();
	znicL2Texture = znicTexture;

	znicL2 = new THREE.Mesh(
		new THREE.BoxGeometry(7,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:znicL2Texture
		})
	);
	scene.add(znicL2);
	znicL2.position.set(33.72, 3/2, 6.5);
	znicL2.receiveShadow = true;
	znicL2.castShadow = true;
	znicL2.rotation.y = -Math.PI/2;

////////////////////////////////////////////////////
//////////////////// Right WALL ////////////////////
////////////////////////////////////////////////////

	//znic 1
	var textureLoader = new THREE.TextureLoader();
	znicP1Texture = znicTexture;

	znicP1 = new THREE.Mesh(
		new THREE.BoxGeometry(7,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:znicL1Texture
		})
	);
	scene.add(znicP1);
	znicP1.position.set(-30.01, 3/2, 0.47);
	znicP1.receiveShadow = true;
	znicP1.castShadow = true;
	znicP1.rotation.y = -Math.PI/2;

	//znic 1
	var textureLoader = new THREE.TextureLoader();
	znicP2Texture = znicTexture;

	znicP2 = new THREE.Mesh(
		new THREE.BoxGeometry(7,3,0.02),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:znicL1Texture
		})
	);
	scene.add(znicP2);
	znicP2.position.set(-30.01, 3/2, 7.47);
	znicP2.receiveShadow = true;
	znicP2.castShadow = true;
	znicP2.rotation.y = -Math.PI/2;








////////////////////////////////////////// MESHES FROM FILES //////////////////////////////////////























	for( var _key in models ){
		(function(key){

			var mtlLoader = new THREE.MTLLoader(loadingManager);
			mtlLoader.load(models[key].mtl, function(materials){
				materials.preload();

				var objLoader = new THREE.OBJLoader(loadingManager);

				objLoader.setMaterials(materials);
				objLoader.load(models[key].obj, function(mesh){

					mesh.traverse(function(node){
						if( node instanceof THREE.Mesh ){
							node.castShadow = true;
							node.receiveShadow = true;
						}
					});
					models[key].mesh = mesh;

				});
			});

		})(_key);
	}

	camera.position.set(-10, player.height, -6);
	camera.lookAt(new THREE.Vector3(0,player.height,0));

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth-20, window.innerHeight-20);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;

	document.body.appendChild(renderer.domElement);

	animate();
}









function onResourcesLoaded(){

	meshes["Lightpost_01"] = models.Lightpost_01.mesh.clone();
	meshes["Lightpost_01"].position.set(-27.6, 0, -10);
	meshes["Lightpost_01"].rotation.set(0, Math.PI, 0);
	scene.add(meshes["Lightpost_01"]);

	meshes["Lightpost_02"] = models.Lightpost_01.mesh.clone();
	meshes["Lightpost_02"].position.set(9, 2, -2);
	meshes["Lightpost_02"].rotation.set(0, Math.PI/4, 0);
	scene.add(meshes["Lightpost_02"]);

	meshes["Lightpost_03"] = models.Lightpost_01.mesh.clone();
	meshes["Lightpost_03"].position.set(25, 0, -10);
	scene.add(meshes["Lightpost_03"]);

	meshes["OakDark1"] = models.OakDark1.mesh.clone();
	meshes["OakDark1"].position.set(0, 3, 0);
	scene.add(meshes["OakDark1"]);

	meshes["OakDark2"] = models.OakDark1.mesh.clone();
	meshes["OakDark2"].position.set(-25, 2, 0);
	scene.add(meshes["OakDark2"]);


for(i=0; i<=30; i++) {
	meshes["OakDark"+i] = models.OakDark1.mesh.clone();
	meshes["OakDark"+i].position.set(-31-Math.floor((Math.random() * 20) + 1), 0-(Math.random() * 1), -3+Math.floor((Math.random() * 30)));
	meshes["OakDark"+i].rotation.set(0, Math.PI/Math.floor((Math.random() * 4) + 2), 0);
	scene.add(meshes["OakDark"+i]);
}

for(i=0; i<=30; i++) {
	meshes["Oak_Green"+i] = models.Oak_Green.mesh.clone();
	meshes["Oak_Green"+i].position.set(-31-Math.floor((Math.random() * 20) + 1), 0-(Math.random() * 1), -3+Math.floor((Math.random() * 30)));
	meshes["Oak_Green"+i].rotation.set(0, Math.PI/Math.floor((Math.random() * 4) + 2), 0);
	scene.add(meshes["Oak_Green"+i]);
}

for(i=0; i<=5; i++) {
	meshes["Oak_Fall"+i] = models.Oak_Fall.mesh.clone();
	meshes["Oak_Fall"+i].position.set(-31-Math.floor((Math.random() * 20) + 1), 0-(Math.random() * 1), -3+Math.floor((Math.random() * 30)));
	scene.add(meshes["Oak_Fall"+i]);
}

for(i=0; i<=30; i++) {
	meshes["Grass"+i] = models.Grass.mesh.clone();
	meshes["Grass"+i].position.set(-31-Math.floor((Math.random() * 20) + 1), 0-(Math.random() * 0.1), -3+Math.floor((Math.random() * 30)));
	scene.add(meshes["Grass"+i]);
}


for(i=31; i<=100; i++) {
	meshes["Grass"+i] = models.Grass.mesh.clone();
	meshes["Grass"+i].position.set(42-Math.floor((Math.random() * 90) + 1), 0-(Math.random() * 0.1), -4-Math.floor((Math.random() * 10)));
	meshes["Grass"+i].rotation.set(0, Math.PI/Math.floor((Math.random() * 4) + 2), 0);

	scene.add(meshes["Grass"+i]);
}

for(i=0; i<=80; i++) {
	meshes["tree1"+i] = models.tree1.mesh.clone();
	meshes["tree1"+i].position.set(42-Math.floor((Math.random() * 90) + 1), 0.8-(Math.random() * 0.3), -45+Math.floor((Math.random() * 30)));
	meshes["tree1"+i].rotation.set(0, Math.PI/Math.floor((Math.random() * 4) + 2), 0);
	scene.add(meshes["tree1"+i]);
}

for(i=0; i<=80; i++) {
	meshes["tree2"+i] = models.tree2.mesh.clone();
	meshes["tree2"+i].position.set(42-Math.floor((Math.random() * 90) + 1), 0.8-(Math.random() * 0.3), -45+Math.floor((Math.random() * 30)));
	meshes["tree2"+i].rotation.set(0, Math.PI/Math.floor((Math.random() * 4) + 2), 0);
	scene.add(meshes["tree2"+i]);
}

for(i=101; i<=150; i++) {
	meshes["Grass"+i] = models.Grass.mesh.clone();
	meshes["Grass"+i].position.set(42-Math.floor((Math.random() * 90) + 1), 0-(Math.random() * 0.1), -45+Math.floor((Math.random() * 30)));
	meshes["Grass"+i].rotation.set(0, Math.PI/Math.floor((Math.random() * 4) + 2), 0);
	scene.add(meshes["Grass"+i]);
}

for(i=1; i<=34; i++) {
	meshes["water"+i] = models.water.mesh.clone();
	meshes["water"+i].position.set(-54+(3*i), 0, -11.5);
	scene.add(meshes["water"+i]);
}

	meshes["ship"] = models.ship.mesh.clone();
	meshes["ship"].position.set(-54, 0, -13);
	meshes["ship"].rotation.set(0, Math.PI/2, 0);
	scene.add(meshes["ship"]);





















}










function animate(){

	if( RESOURCES_LOADED == false ){
		requestAnimationFrame(animate);

		loadingScreen.box.position.x -= 0.05;
		if( loadingScreen.box.position.x < -10 ) loadingScreen.box.position.x = 10;
		loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);

		renderer.render(loadingScreen.scene, loadingScreen.camera);
		return;
	}

	requestAnimationFrame(animate);

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;


	meshes["ship"].position.x +=0.1;
	shiplight.position.x +=0.1;
	if(meshes["ship"].position.x > 54) {
	meshes["ship"].rotation.x -=0.1;
	}
	if(meshes["ship"].position.x > 60) {
	meshes["ship"].rotation.x =0;
	shiplight.position.x = -54;
	meshes["ship"].position.x = -54;
	}



	if(keyboard[87]){ // W
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D

		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}

	if(keyboard[37]){ // Left
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // Right
		camera.rotation.y += player.turnSpeed;
	}

	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;
