const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;

var gameState = "PLAY";
var invisibleGround;
var score = 20 ;

var bg_img;
var black_cat;
var dog1;
var dog2;
var dog3;
var dog4;
var dog5;
var dog6;
var dog7;
var dog8;
var dog9;
var dog10;
var dog11;
var dog12;

var catFood1;
var catFood2;
var catFood3;
var toy1 ;
var restart;
var gameover;

function preload()
{
  bg_img =loadImage("./game elements/background.jpg");
  toy1 = loadImage("./game elements/toy1-PhotoRoom-removebg-preview.png");
  black_cat = loadAnimation("./game elements/cat_1-PhotoRoom-removebg-preview.png","./game elements/cat_2-PhotoRoom-removebg-preview.png","./game elements/cat_3-PhotoRoom-removebg-preview.png","./game elements/cat_4-PhotoRoom-removebg-preview.png","./game elements/cat_5-PhotoRoom-removebg-preview.png","./game elements/cat_6-PhotoRoom-removebg-preview.png","./game elements/cat_7-PhotoRoom-removebg-preview.png","./game elements/cat_8-PhotoRoom-removebg-preview.png","./game elements/cat_9-PhotoRoom-removebg-preview.png","./game elements/cat_10-PhotoRoom-removebg-preview.png","./game elements/cat_11-PhotoRoom-removebg-preview.png","./game elements/cat_12-PhotoRoom-removebg-preview.png","./game elements/cat_13-PhotoRoom-removebg-preview.png")
  black_cat_C = loadImage("./game elements/cat_3-PhotoRoom-removebg-preview.png");
  catFood1 = loadImage("./game elements/catfood1-PhotoRoom-removebg-preview.png");
  catFood2 = loadImage("./game elements/catfood.2-PhotoRoom-removebg-preview.png");
  catFood3 = loadImage("./game elements/catfood3-PhotoRoom-removebg-preview.png");
  dog1 = loadImage("./game elements/dog_01-PhotoRoom-removebg-preview.png");
  dog2 = loadImage("./game elements/dog_02-PhotoRoom-removebg-preview.png");
  dog3 = loadImage("./game elements/dog_3-PhotoRoom-removebg-preview.png");
  dog4 = loadImage("./game elements/dog_4-PhotoRoom-removebg-preview.png");
  dog5 = loadImage("./game elements/dog_5-PhotoRoom-removebg-preview.png");
  dog6 = loadImage("./game elements/dog_6-PhotoRoom-removebg-preview.png");
  dog7 = loadImage("./game elements/dog_7-PhotoRoom-removebg-preview.png");
  dog8 = loadImage("./game elements/dog_08-PhotoRoom-removebg-preview.png");
  dog9 = loadImage("./game elements/dog_9-PhotoRoom-removebg-preview.png");
  dog10 = loadImage("./game elements/dog_10-PhotoRoom-removebg-preview.png");
  dog11 = loadImage("./game elements/dog_11-PhotoRoom-removebg-preview.png");
  dog12 = loadImage("./game elements/dog_12-PhotoRoom-removebg-preview.png");
  restart = loadImage("./game elements/restart_img.png");
  gameover = loadImage("./game elements/game_over_.png")
}

function setup()
{
 createCanvas(1200,700)

 black_catS = createSprite(100,550,100,100);
 black_catS.scale = 1.5;
 black_catS.addAnimation("black_cat",black_cat);
 black_catS.addAnimation("collided",black_cat_C);
 invisibleG = createSprite(420,600,1600,10)
 invisibleG.visible = false;

 restartS = createSprite(600,250);
 restartS.addImage("restart",restart);
 restartS.scale = 0.4
 restartS.visible = false;

gameoverS = createSprite(600,140);
gameoverS.addImage("gameover",gameover);
gameoverS.scale = 0.6
gameoverS.visible = false;

DogsGroup = new Group();
catFoodsGroup = new Group();
toyGroup = new Group();

}

function draw () {
 background(bg_img)

 textSize(20);
 strokeWeight(16);
 fill("white");
 text("Score = "+score,900,50);

 
 if (gameState==="PLAY") 
 {

    console.log(black_catS.y)
    if(keyDown("space")&& black_catS.y>270) {
    
      black_catS.velocityY = -22;
    }
  
    black_catS.velocityY = black_catS.velocityY + 0.8

    SpawnDogs();
    SpawncatFood();
    SpawnToy();

    black_catS.collide(invisibleG);

    if (score===0) 
  {
    gameState="END"
  }
  
  if(catFoodsGroup.isTouching(black_catS)){
  catFoodsGroup.destroyEach();
  score = score + 10;
  

}

  if(toyGroup.isTouching(black_catS)){
    toyGroup.destroyEach();
    score = score + 20;
    

  }
  if(DogsGroup.isTouching(black_catS)){
    DogsGroup.destroyEach();
    score = score - 10;

  }
 } 

    if (gameState==="END") 
 {
  gameoverS.visible = true;
  restartS.visible = true;
  black_catS.velocityY = 0;
  catFoodsGroup.destroyEach();
  toyGroup.destroyEach();
  catFoodsGroup.destroyEach();
  catFoodsGroup.setVelocityXEach(0);
  DogsGroup.setVelocityXEach(0);
  toyGroup.setVelocityXEach(0);

  black_catS.changeAnimation("collided",black_cat_C)
  if(mousePressedOver(restartS)) {
    reset();
   }
 }


  
  drawSprites();
}

function SpawncatFood()
{
 var rand=Math.round(random(1,3));
 if(frameCount % 350 === 0){

 catFoodS = createSprite(1200,550,50,50);
 catFoodS.velocityX=-5;
 catFoodS.scale = 0.1

 switch (rand)
  {
  case 1:catFoodS.addImage("catFood1",catFood1);
  catFoodS.scale = 0.3
    break;
   case 2:catFoodS.addImage("catFood2",catFood2);
    break;
    case 3:catFoodS.addImage("catFood3",catFood3);
    break;

  default:break;

 }
 catFoodsGroup.add(catFoodS);
 }
 
}

function SpawnDogs()
{
  var rand1=Math.round(random(1,12));
  console.log(rand1)
  if(frameCount % 150 === 0){

  dogs_S = createSprite(1200,550,100,100);
  dogs_S.velocityX = -5;

   switch (rand1)
    {
       case 1:dogs_S.addImage("dog1",dog1);
        break;
        case 2:dogs_S.addImage("dog2",dog2);
        break;
        case 3:dogs_S.addImage("dog3",dog3);
        break;
        case 4:dogs_S.addImage("dog4",dog4);
        break;
        case 5:dogs_S.addImage("dog5",dog5);
        break;
        case 6:dogs_S.addImage("dog6",dog6);
        break;
        case 7:dogs_S.addImage("dog7",dog7);
        break;
        case 8:dogs_S.addImage("dog8",dog8);
        break;
        case 9:dogs_S.addImage("dog9",dog9);
        break;
        case 10:dogs_S.addImage("dog10",dog10);
        break;
         case 11:dogs_S.addImage("dog11",dog11);
        break;
         case 12:dogs_S.addImage("dog12",dog12);
        break;

    default:break;
   }
   DogsGroup.add(dogs_S);
  }
}
function SpawnToy()
{
  if(frameCount % 450 === 0){
  var toy = createSprite(1200,550,50,50);
  toy.setCollider("rectangle",0,0,200,200);
  toy.addImage("toy1",toy1);
  toy.velocityX = -5;
  toy.scale = 0.2
  toyGroup.add(toy);
  }
  
}
function reset(){
  gameState = "PLAY";
  gameoverS.visible = false;
  restartS.visible = false;
  black_catS.visible = true;
  black_catS.changeAnimation("black_cat",black_cat);
  catFoodsGroup.destroyEach();
  toyGroup.destroyEach();
  catFoodsGroup.destroyEach();
  score = 50;
}