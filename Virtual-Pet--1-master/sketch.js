//Create variables here
var dog, dogImg, dogImg1;
var database;
var foodS,foodStock, fedTime, lastFed, feed, addFood, foodObject;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database()
  createCanvas(1000, 400);
  foodObject=new Food()
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed("feedDog");
  addFood=createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87);
foodObject.display;
fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed=data.val();
})
  
  fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("last feed:"+lastFed%12+"PM",350,30)
} else if(lastFed==0){
  text("last feed:12 AM",350,30)
} else{ 
  text("last feed:"+lastFed+"AM",350,30)
}
  //add styles here
  drawSprites();
}
function readStock(data){
  foodS=data.val()
  foodObject.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(dogImg1);
  
  if(foodObject.getFoodStock()<= 0){
    foodObject.updateFoodStock(foodObject.getFoodStock()*0);
  }else{
    foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
