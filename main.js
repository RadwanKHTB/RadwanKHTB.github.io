import * as THREE from 'https://unpkg.com/three@0.148.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.148.0/examples/jsm/controls/OrbitControls.js';


let camera, scene, renderer, controls, container, canvas;
let mesh, mesh2, mesh3;
let screenHeight, screenWidth;
let INTERSECTED, isINTERSECTED, clickedID, prevClickedID;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2( 1, 1 );

const color = new THREE.Color();
const white = new THREE.Color().setHex( 0xAAFF00);


init();
animate();

function init() {

  container = document.createElement( 'div' );
  container.className = 'canvasContainer';
	document.getElementById("world").appendChild( container );

  scene = new THREE.Scene();
  
  screenWidth = 600;
  screenHeight = 500;
  
  //Camera
  camera = new THREE.PerspectiveCamera(75, screenWidth/screenHeight, 0.1, 1000);
  scene.add(camera)
  camera.position.z = -20;
  camera.position.x = 10
  camera.position.y = 10
  
  //Renderer
  canvas = document.querySelector("#bg");
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  
  
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(screenWidth, screenHeight);
  
  container.appendChild(renderer.domElement);
  
  
  //Light
  const light = new THREE.PointLight(0xffffff, 1, 100)
  light.position.set(5, 10, 5);
  
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);
  scene.add(light);
  
  //Resize Function
  

  //Moon
  const moonTexture = new THREE.TextureLoader().load("/images/earthmap.jpg");
  const moonNormal = new THREE.TextureLoader().load("/images/2k_earth_normal_map.tif");
  
  const geometry = new THREE.SphereGeometry(14, 32, 32);
  
  const moon = new THREE.Mesh(geometry,
    new THREE.MeshStandardMaterial( {
      map: moonTexture,
      normalMap: moonNormal
    } )
    );
    //moon.position.y = 70
    moon.position.y = 0
    moon.userData.ident = "moon";
    scene.add(moon);
    


    var dgeometry = new THREE.BoxGeometry(100, 100 ,20);
    const clickMaterial = new THREE.MeshBasicMaterial({
      color: white,});
      const clickMaterial2 = new THREE.MeshBasicMaterial({
        color: white,});
        const clickMaterial3 = new THREE.MeshBasicMaterial({
          color: white,});

    mesh = new THREE.Mesh(dgeometry,clickMaterial);

      mesh.position.x = 8;
      mesh.position.y = 6;
      mesh.position.z = -11;

      mesh.scale.x = 0.009;
      mesh.scale.y = 0.009;
      mesh.scale.z = 0.02;
      
      mesh2 = new THREE.Mesh(dgeometry,clickMaterial2);
      
      mesh2.scale.x = 0.009;
      mesh2.scale.y = 0.009;
      mesh2.scale.z = 0.02;

    mesh2.position.x = 9.3;
    mesh2.position.y = 8.5;
    mesh2.position.z = -7.2;

    mesh3 = new THREE.Mesh(dgeometry,clickMaterial3);

      mesh3.scale.x = 0.009;
      mesh3.scale.y = 0.009;
      mesh3.scale.z = 0.02;
      
    mesh3.position.x = 8.7;
    mesh3.position.y = 11.6;
    mesh3.position.z = -1;

    
    var meshes = [mesh,mesh2,mesh3];
    meshes.forEach(m => { scene.add(m); });
      
      
      
      
      
      
      /*Stars
      function starMaker(){
        const starGeo = new THREE.SphereGeometry(.25, 8 ,8);
        const starMaterial = new THREE.MeshStandardMaterial( { color:0xffffff } );
        const star = new THREE.Mesh(starGeo, starMaterial);
        
        const [x, y] = Array(2).fill().map(() => THREE.MathUtils.randFloatSpread( 400 ) );
        const z = THREE.MathUtils.randFloatSpread( 300 );
        
        star.position.set(x, y, z);
        scene.add(star);
      }
      
      Array(1500).fill().forEach(starMaker);
      */     
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;

      window.addEventListener( 'resize', onWindowResize );
      window.addEventListener('mousemove', onPointerMove );
      window.addEventListener('pointerdown', onPointerDown);
}
    
function onPointerDown() {
  if(isINTERSECTED == true){
    clickedID = INTERSECTED.uuid;
  }
  if(clickedID == mesh2.uuid){
    console.log('Syria');
    document.getElementById('infoHead').innerHTML = document.getElementById('infoHead').innerHTML.replace(/[\s\S]*/, '<b>Damascus, Syria</b>');
    document.getElementById('infoText').innerHTML = document.getElementById('infoHead').innerHTML.replace(/[\s\S]*/, '<b>I was born and raised in Damascus, Syria. I have fond memories of Syria and I still visit every year, I lived there up until I was 7 years old by then it was not safe to stay so my family decided to move out of the country so that me and my siblings have more oppurtunities for our futures.</b>');
  }
  if(clickedID == mesh.uuid){
    console.log('UAE');
    document.getElementById('infoHead').innerHTML = document.getElementById('infoHead').innerHTML.replace(/[\s\S]*/, '<b>Dubai, UAE</b>');
    document.getElementById('infoText').innerHTML = document.getElementById('infoHead').innerHTML.replace(/[\s\S]*/, '<b>For most of my early life I lived in Dubai. Everyone seems to think that people who live in Dubai are all rich and living their best lives. Unfortunately this is no where near the truth. My family was lucky to be able to get a small apartment that kept us comfortbale for 4 years before moving houses to a more accomadating house and eventually to the Netherlands.</b>');

  }
  if(clickedID == mesh3.uuid){
    console.log('NL');
    document.getElementById('infoHead').innerHTML = document.getElementById('infoHead').innerHTML.replace(/[\s\S]*/, '<b>Groningen, Netherlands</b>');
    document.getElementById('infoText').innerHTML = document.getElementById('infoHead').innerHTML.replace(/[\s\S]*/, '<b>The Netherlands is the first European country I have ever visited let alone moved to. It honestly has been a wonderful experience with its highs and lows. It took time to adjust and sometimes I still am. However I am glad I was able to meet such amazing people and finally be able to handle independance.</b>');

  }
}
    
function onWindowResize() {
    
      var width = screenWidth;
      var height = screenHeight;
      
      camera.aspect = width / height;
      renderer.setSize(width, height);
      camera.updateProjectionMatrix();
      
}

function onPointerMove(e) {

  e.preventDefault();
  const rect = renderer.domElement.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  mouse.x = ( x / canvas.clientWidth ) *  2 - 1;
  mouse.y = ( y / canvas.clientHeight) * - 2 + 1

}

    

function animate(){
  requestAnimationFrame(animate);
  controls.update();

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children);

  if ( intersects.length > 0 )
{
    // if the closest object intersected is not the currently stored intersection object
    if ( intersects[ 0 ].object != INTERSECTED )
    {
        if ( INTERSECTED )
            INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
        // store reference to closest object as current intersection object
        INTERSECTED = intersects[ 0 ].object;
        // store color of closest object (for later restoration)
        INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
        // set a new color for closest object
        if(intersects[ 0 ].object.userData.ident != 'moon'){
        isINTERSECTED = true;
        INTERSECTED.material.color.setHex( 0xFF0000 );
        }
    }
}
else // there are no intersections
{
    // restore previous intersection object (if it exists) to its original color
    if ( INTERSECTED ){
        INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
        isINTERSECTED = false;
    }
    // remove previous intersection object reference
    //     by setting current intersection object to "nothing"
    INTERSECTED = null;
}



  render();
}
function render() {

  renderer.render( scene, camera );

}
