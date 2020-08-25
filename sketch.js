var trex, trex_running, trex_collided;
var ground,InvisibleGround, groundImage;
var rand,count,obstacle1,obstacle2,obstacele3,obstacle4,obstacle5,obstacle6,cloud1,Bird;
var ObstaclesGroup,CloudsGroup, BirdsGroup;
var count = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,restart;
var jumpSound,dieSound,checkPointSound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOver1 = loadImage("gameOver.png");
  restart1 = loadImage("restart.png"); 
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  
  cloud1 = loadImage("cloud.png");
  Bird1 = loadAnimation("bird1.png","bird2.png");
}

function setup() {
  createCanvas(600, 300);
  
  trex = createSprite(50,80,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.depth = 2;
  
  ground = createSprite(200,280,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  InvisibleGround = createSprite(200,290,400,10); 
  InvisibleGround.visible = false;
  
  gameOver = createSprite(300,150,20,20);
  gameOver.addAnimation("gameOver",gameOver1);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,180,20,20)
  restart.addImage("restart",restart1);
  restart.scale = 0.5;  
  restart.visible = false;
  
  ObstaclesGroup = new Group();
  CloudsGroup = new Group();
  BirdsGroup = new Group();  
   
}

function draw() {
  
  background(0);
  background("White");
  
   trex.collide(InvisibleGround);
  
  if(gameState === PLAY) {
  
  if(keyDown("space") && trex.y > 260) {
    trex.velocityY = -12;
    jumpSound.play();
  }
  
  trex.velocityY = trex.velocityY + 0.8;
    
   console.log(trex.y); 
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
   ground.velocityX = -(6+count/100); 
    
  if(ObstaclesGroup.isTouching(trex) || BirdsGroup.isTouching(trex)) {
   gameState = END;
   dieSound.play(); 
  } 
    
  count = count + Math.round(getFrameRate()/60);
    
  spawnObstacles();
  spawnClouds();
  spawnBirds();
  
  }
  
  else if(gameState === END) {
  ground.velocityX = 0;
  ObstaclesGroup.setVelocityXEach(0);
  ObstaclesGroup.setLifetimeEach(-1);
  CloudsGroup.setVelocityXEach(0);  
  CloudsGroup.setLifetimeEach(-1);
  BirdsGroup.setVelocityXEach(0);
  BirdsGroup.setLifetimeEach(-1);
  trex.velocityY = 0;  
  gameOver.visible = true;
  restart.visible = true;  
  }
  
  if(mousePressedOver(restart)) {
  reset();  
  }
  
  drawSprites();
  
  fill("Grey"); 
  textSize(20);
  text("Score : " + count,450,30);  

}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,265,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    rand = Math.round(random(1,6));
    switch(rand) {
      case 1:obstacle.addImage(obstacle1);
       break;
      case 2:obstacle.addImage(obstacle2);
       break;
       case 3:obstacle.addImage(obstacle3);
       break;
       case 4:obstacle.addImage(obstacle4);
       break;
       case 5:obstacle.addImage(obstacle5);
       break;
       case 6:obstacle.addImage(obstacle6);
        break;
        default:break;
    }
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
 }
}

    //Spawning the clouds
function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloud1);
    cloud.scale = 0.5;
    cloud.velocityX = -4;
    
     //assign lifetime to the variable
    cloud.lifetime = 150 ;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
}

    //Spawning Birds
function spawnBirds() {
  if(frameCount % 100 === 0) {
    var Bird = createSprite(600,150,20,20);
    Bird.y = Math.round(random(230,270));
    Bird.addAnimation("bird",Bird1);
    Bird.scale = 0.3;
    Bird.velocityX = -8;
  
    Bird.lifetime = 1200;
    BirdsGroup.add(Bird);
  }
}

function reset() {
  count = 0;
  gameState = PLAY;
  //trex.frameDelay(5);
  //Bird.frameDelay(10);
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("trex",trex_running);
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  BirdsGroup.destroyEach();
}





