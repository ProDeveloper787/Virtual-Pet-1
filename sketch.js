var database;
var foodS;

function preload()
{
  DogImage = loadImage("images/dogImg.png")
  HungryDogImage = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  Dog = createSprite(250,300,50,50);
  Dog.addImage(DogImage)
  Dog.scale = 0.15;

  foodStock = database.ref('Food')
  foodStock.on("value",readStock);
  textSize(20)
}


function draw() {  
  background("cyan")
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS)
    Dog.addImage(HungryDogImage)
  }

  drawSprites();
  text("Food Remaining: "+foodS,170,200)
  text("Press The Up Arrow to Feed!",130,10)
  

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x <= 0) {
    x = 0;
  }
  else {
    x = x-1;
  }
  database.ref('/').update({
    Food: x
  })
}