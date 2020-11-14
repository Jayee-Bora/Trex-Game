var trex;
var trex_animation, trex_end
var count = 0;
var highScore = 0; 
var ground
var ground_image
var InvisibleGround
var cloud,CloudImage, obstacle,obstacle1, obstacle2, obstacle3, obstacle4, obstacles5, obstacle6, obstacleGroup
var gameOver, restart, gameOver_image, restart_image
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  trex_animation = loadAnimation("trex1.png","trex3.png","trex4.png");  
ground_image= loadImage("ground2.png");
  CloudImage= loadImage("cloud.png");
   obstacle1= loadImage("obstacle1.png");
   obstacle2= loadImage("obstacle2.png");
   obstacle3= loadImage("obstacle3.png");
   obstacle4= loadImage("obstacle4.png");
   obstacle5= loadImage("obstacle5.png");
   obstacle6= loadImage("obstacle6.png");
  gameOver_image= loadImage("gameOver.png");
  restart_image= loadImage("restart.png");
  trex_end= loadAnimation("trex_end.png");
}

function setup() {
  createCanvas(600, 200);
  ground = createSprite(300,180,600,10)
  ground.addImage("g",ground_image)
  trex = createSprite(50,90,50,50);
  trex.addAnimation("running",trex_animation)
  trex.addAnimation("stop",trex_end)
  trex.scale= 0.5;
  InvisibleGround = createSprite(300,190,600,10)
  InvisibleGround.visible= false;
  gameOver = createSprite(300,100,40,20)
  gameOver.addImage("over", gameOver_image);
  gameOver.visible= false;
  restart= createSprite(300,150,20,20);
  restart.visible= false;
  restart.addImage("restart", restart_image);
  CloudsGroup = createGroup()
  obstacleGroup = createGroup()
}

function draw() {
  background("white");
 text("Score: "+ count, 500, 50);
  text("High score:"+ highScore,500,80);
  if(gameState ===PLAY){
  if(keyDown("space") && trex.y>=161){
    trex.velocityY=-10; 
  }
  trex.velocityY = trex.velocityY + 0.8;  
 
    ground.velocityX = -(6 + 3*count/100);
    count= count+Math.round(getFrameRate()/50) ;
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  spawnClouds();
  spawnObstacles();  
    if(trex.isTouching(obstacleGroup)){
       gameState= END;
       }
    
  }
  else if(gameState === END){
   ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1); 
    trex.changeAnimation("stop");
   gameOver.visible= true;
    restart.visible= true;
    if(mousePressedOver(restart)) {
    reset();
      
  }
    if(count>highScore){
      highScore= count;
    }
    
  }
  trex.collide(InvisibleGround);
  
  drawSprites(); 
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80, 120));
    cloud.scale = 0.5;
    cloud.velocityX = -(3 + 3*count/100);
    cloud.addImage("clouds", CloudImage)
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
     obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
   switch(rand){
      case 1: obstacle.addImage("o1", obstacle1);
       break;
      case 2: obstacle.addImage("o1", obstacle2);
       break;
       case 3: obstacle.addImage("o1", obstacle3);
       break;
       case 4: obstacle.addImage("o1", obstacle4);
       break;
       case 5: obstacle.addImage("o1", obstacle5);
       break;
       case 6: obstacle.addImage("o1", obstacle6);
       break;
       default:
       break;
          
          }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
  
}
function reset(){
  gameState = PLAY;
 obstacleGroup.destroyEach();
 CloudsGroup.destroyEach();
 trex.changeAnimation("running");
 gameOver.visible= false;
 restart.visible=false;
 count=0;
     
}
