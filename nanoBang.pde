import themidibus.*;
MidiBus myBus; // The MidiBus

import codeanticode.syphon.*;
SyphonServer server;

import controlP5.*;
ControlP5 btn;

PGraphics canvas;
PImage bg;

int drawFlag = 0;
int slotNo = 0;
int startFrame = 0;
int drawFrame = 0;
void setup() { 
  bg = loadImage("bg.png");
  MidiBus.list();
  myBus = new MidiBus(this, 0, -1); 
  
  size(800,200, P3D);
  canvas = createGraphics(1280, 720, P3D);
  frameRate(60);
  //smooth();
  
  // Create syhpon server to send frames out.
  server = new SyphonServer(this, "Processing Syphon");
  
  
  ///GUI
  //btn.addButton("colorA", 0, 100, 100, 200, 19);
  
}

void draw() {
  
  drawFrame = frameCount - startFrame;
  background(0,0,0);
  image(bg, 0, 0);
  canvas.beginDraw();
  canvas.clear();
   if (mousePressed == true) {
    canvas.background(255,0,0);
  } else {
    fill(255);
  }
  //canvas.background(127);
  //canvas.lights();
  canvas.translate(canvas.width/2, canvas.height/2);
  //canvas.rotateX(frameCount * 0.1);
  //canvas.rotateY(frameCount * 0.01);  
  
  
  if(drawFlag != 0){
    if(slotNo == 0 ){
      canvas.box(50);
    }else if(slotNo == 1 ){
      canvas.box(150);
    }else if(slotNo == 2 ){
      canvas.box(250);
    }else if(slotNo == 3 ){
      canvas.box(350);
    }else if(slotNo == 4 ){
      canvas.rect(100,drawFrame,100,100);
    }else if(slotNo == 5 ){
      canvas.rect(100,100,100,100);
    }else if(slotNo == 6 ){
      canvas.box(650);
    }else if(slotNo == 7 ){
      canvas.box(750);
    }
  }
  canvas.endDraw();
  image(canvas, 0, 0, 320, 180);
  server.sendImage(canvas);
  println(frameRate);
}


void controllerChange(int channel, int number, int value) {
  // Receive a controllerChange
  println();
  println("Controller Change:");
  println("--------");
  println("Channel:"+channel);
  println("Number:"+number);
  println("Value:"+value);
  
  
  if(drawFlag == 0){
    if(value == 0){
    }else{
      drawFlag = 1;
      startFrame = frameCount;
    }
  }else{
    if(value == 0){
      drawFlag = 0;
    }
  }
 
  
  // xxxx ////////////////////////
  if           (number == 64) { 
    slotSelect(0);
  } else if (number == 65) { 
    slotSelect(1);
  } else if (number == 66) { 
    slotSelect(2);
  } else if (number == 67) { 
    slotSelect(3);
  } else if (number == 68) { 
    slotSelect(4);
  } else if (number == 69) { 
    slotSelect(5);
  } else if (number == 70) { 
    slotSelect(6);
  } else if (number == 71) { 
    slotSelect(7);
  }
}

void slotSelect(int n){
  slotNo = n;
}


public void colorA(int theValue) {
  println("a button event from colorA: "+theValue);
}
