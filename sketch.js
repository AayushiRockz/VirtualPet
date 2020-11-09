//Create variables here
var dog, database,foodS,foodStock;
var d1Image,d2Image;



function preload()
{
  //load images here
  d1Image = loadImage("images/dogImg.png");
  d2Image = loadImage("images/dogImg1.png");
}

function setup() {
  
  database = firebase.database();
  createCanvas(500, 500);

  //  making dog
  dog = createSprite(260,360,40,40);
  dog.addImage("HungryDog",d2Image);
  dog.scale = 0.38;

   foodStock = database.ref("Food");
   foodStock.on("value",readStock);
  
   textSize(20);
}


function draw() {  
  background(255,145,177);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(d1Image);
  }


  drawSprites();
  //add styles here
 
 fill("white");
 stroke("black");
 text("Food remaining : "+foodS,170,200);
 text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

// to read values from dataBase
function readStock(data){
  foodS=data.val();
}

// to write the values in DB
function writeStock(x){
  if(x<0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}





