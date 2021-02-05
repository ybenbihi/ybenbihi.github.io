let dimX = window.innerWidth
let dimY = window.innerHeight

let img = [];
let currImage = 0;
function setup() {
  frameRate(120)
  createCanvas(dimX, dimY);
  for(var i=0;i<9;i++){
    img.push(loadImage("image"+i+".png"))
  }
  showText()
}

function draw() {
  if(dimX != window.innerWidth || dimY != window.innerHeight){
    dimX = window.innerWidth
    dimY = window.innerHeight
    resizeCanvas(dimX, dimY)
    showText()
  }
  if(mouseIsPressed){
    image(img[currImage], mouseX-img[currImage].width/2, mouseY)
  }
  
}

function keyPressed(){
  if(keyIsPressed){
    if(keyCode === 82){
      resizeCanvas(dimX, dimY)
      showText()
    }
  }
  if(keyCode === 83){
    currImage = (currImage+1)%img.length
  }
}

function showText(){
  textSize(50)
  text("Click and drag", dimX/2 - 200, dimY/2)
  textSize(25)
  text("Press 's' to change the image", dimX/2 - 200, dimY/2+30)
  text("Press 'r' to erase the worm", dimX/2 - 200, dimY/2+60)
  text("@_yasboy on Twitter", dimX/2 - 200, dimY/2+90)
}