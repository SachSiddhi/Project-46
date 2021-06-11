const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var bg,chocImg,girlImg,gorImg,lollyImg;
var bgGround;
var ground;
var girl;
var candy;
var score;
var candyGrp;
var gorGrp;
var gor;
var attempt = 3;

function preload(){
  bg = loadImage("jungleBg.jpg");
  chocImg = loadImage("chocolate.png");
  girlImg = loadAnimation("girl1.png", "girl1walk.png");
  gorImg = loadImage("gorila2.png");
  lollyImg = loadImage("lollypop.png");
}

function setup() {
  createCanvas(1500,800);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  bgGround = createSprite(0,0,1500,800);
  bgGround.addImage(bg);  
  bgGround.scale = 3.5;
  bgGround.velocityX = -4;
  bgGround.x = bgGround.width/2;

  ground = createSprite(0,600,1500,10);
  ground.velocityX = -6;
  ground.x = ground.width/2;
  ground.visible = false;

  girl = createSprite(75,500,20,20);
  girl.addAnimation("girl_running",girlImg);
  girl.scale = 2;

  candyGrp = new Group();
  gorGrp = new Group();

  score = 0;
}

function draw() {
  background(0);
  stroke("white");
  strokeWeight(4); 
  textSize(30);
  fill("red");
  text("Score : " + score, 200, 300);

  if(bgGround.x < 100){
    bgGround.x = bgGround.width/2;
  }

  if(ground.x < 100){
    ground.x = ground.width/2;
  }

  
  if(keyCode === 32 && girl.y>470){
    girl.velocityY = -12;
  }
  girl.velocityY = girl.velocityY + 0.5;
  girl.collide(ground);

  
  
  Candies();

  if(girl.isTouching(candyGrp)){
    score = score + 10;
    girl.scale = 2;
    candyGrp.destroyEach();
  } 
  console.log(score);
  Gorila();
  if(girl.isTouching(gorGrp)){
    attempt = attempt - 1;
    girl.scale = 1;
    gorGrp.destroyEach();
  }
  drawSprites();
}

function Candies(){
  if(frameCount % 150 === 0){
    candy = createSprite(1200,550);
    var a = Math.round(random(1,2));
    if(a === 1){
      candy.addImage(chocImg);
    }
    else if(a === 2){
      candy.addImage(lollyImg);
    }
    candy.lifetime = 400;
    candy.velocityX = -5;
    candyGrp.add(candy);

  }


}

function Gorila(){
  if(frameCount % 250 === 0){
    gor = createSprite(1200,550);
    gor.addImage(gorImg);
    gor.velocityX = -7;
    gorGrp.add(gor);
  }
}

