//Create variables here
var dog,Dog,happydog,database,foodS,foodStock;
var database;

function preload()
{
//load images here
dog = loadImage("images/dogImg.png");  
happydog = loadImage("images/dogImg1.png");
}

function setup() {

  database=firebase.database();
  console.log(database);
  createCanvas(1000, 1000);
  Dog = createSprite(200,300,150,150);
  Dog.addImage(dog);
  Dog.scale=0.15;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);

  foodObject=new Food();

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
 
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);
 
 
}


function draw() {  
  background(100,50,100); 
  foodObject.display();
  fill(255,255,254)
  textSize(15);
  if(lastFed>=12){
  text("Last Feed :" +lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text(" Last Feed : 12  AM",350,30);
  }else{
    text ("Last Feed : " + lastFed + "AM",350,30);
  }

}

function readStock(data){
foodS=data.val();
}

function feedDog(){
  dog.addImage(happydog);

  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoodS(){
  foodS++;
  database.ref('/').update({
Food:foodS
  })
}