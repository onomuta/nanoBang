import themidibus.*;
MidiBus myBus; // The MidiBus

import codeanticode.syphon.*;
SyphonServer server;

import controlP5.*;
ControlP5 btn;

boolean btn1 = false;  

PGraphics canvas;
PImage bg;

int drawFlag = 0;
int slotNo = 0;
int startFrame = 0;
int drawFrame = 0;

boolean previewMode = false;
void setup() { 
  bg = loadImage("bg.png");
  MidiBus.list();
  myBus = new MidiBus(this, 0, -1); 
  
  size(800,200, P3D);
  canvas = createGraphics(1280, 720, P3D);
  frameRate(60);
  //smooth();
  
  // Create syhpon server to send frames out.
  server = new SyphonServer(this, "Processing Syphon - nanoBang");
  
  ///GUI
  btn = new ControlP5(this);
  btn.addButton("btn1", 0, 100, 100, 200, 19);
  
}

void draw() {
  
    drawFrame = frameCount - startFrame;
    background(150);
    image(bg, 0, 0);
    canvas.beginDraw();
    canvas.clear();
    canvas.translate(canvas.width/2, canvas.height/2);
      
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
  
    // プレビューモード
    if(previewMode != true){
      server.sendImage(canvas);
    }
    // プレビュー描画
    image(canvas, 10,10, 150, 84.375);
  
    //println(frameRate);
    //println(getState("btn1") );
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
  if        (number == 64) { 
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


//void colorA(int theValue) {
//  println("a button event from colorA: "+theValue);
//}

void btn1(boolean value){
  //if(value){
  //  println(1);
  //} else {
  //  println(0);  
  //}
  println(value);
}
