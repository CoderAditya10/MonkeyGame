var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(550,500)

  //creating monkey
  monkey = createSprite(65,400,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(400,460,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
   //Create banana and obstacles group
  bananaGroup=createGroup();
  obstaclesGroup=createGroup();
}


function draw() {
background(220);
  
   if (ground.x < 100){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")&& monkey.y >= 250) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY +0.8; 
  
  monkey.collide(ground);
  
  //spawn obstacles on the ground
    spawnObstacles();
  
  //spawn the clouds
    spawnBanana();
  
  if(bananaGroup.isTouching(monkey)) {
    bananaGroup[0].destroy();
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time : "+ survivalTime,200,50)
  
  drawSprites();
}
function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(600,410,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
  
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
 }
}

function spawnBanana() {
  
  if (frameCount % 120 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,250));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 250;
    
    bananaGroup.add(banana);
  }
}
