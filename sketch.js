var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg,ballonJumpsound;
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var bg2

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
ballonJumpsound = loadSound("assets/jump.mp3")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

bg2 = loadImage("assets/bgImg2.jpg")
}

function setup(){

  createCanvas(800,800)
//imagem de fundo
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3


//criar solos superiores e inferiores
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//criar o balão      
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.4;



}

function draw() {
  
  background("black");
        
          //faça o balão de ar quente pular
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            ballonJumpsound.play()
          }

          //adicione gravidade
           balloon.velocityY = balloon.velocityY + 2;

           
          Bar();
   
        drawSprites();
       
        //gerar obstáculos superiores
      spawnObstaclesTop();

      
}


function spawnObstaclesTop() 
{
      if(World.frameCount % 60 === 0) {
        obstacleTop = createSprite(400,50,40,50);
    
    obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.2;
    obstacleTop.velocityX = -4;

    //posições y aleatórias para os principais obstáculos
    obstacleTop.y = Math.round(random(10,100));

    //gerar obstáculos superiores aleatórios
    //var rand = Math.round(random(0,1));
    //var rand = random(1,2);
    var rand = Math.round(random(1,2));
//var rand=roundoff(random(1,2))

    switch(rand) {
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
      default: break;
    }

     //atribuir tempo de vida à variável
   obstacleTop.lifetime = 100;
   //obstacleTop.depth=obstacleTop.depth+1;
    balloon.depth = balloon.depth + 1;
 //  balloon.depth = balloon.depth - 1;
      //obstacleTop.depth=obstacleTop.depth-1;

      }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
         }
}

async function noite(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/America/Sao_Paulo")
  var responseJSON = await response.json()
  var dateTime = resposeJSON.dateTime
  var hour = dateTime.slice(11,13)
  if(hour >= 06 && hour <= 16 ){
    bg.addImage(bgImg);
    bg.scale = 1.3
  }else{
    bg.addImage(bg2)
    bg.scale = 1.5
    bg.x = 200
    bg.y = 200
  }
}
  
