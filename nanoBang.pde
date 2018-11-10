import themidibus.*;
MidiBus myBus; // The MidiBus
import codeanticode.syphon.*;
SyphonServer server;
import controlP5.*;
ControlP5 cp5;

PGraphics canvas;
PImage bg;
PShader sd1, sd2, sd3, sd4, sd5, sd6, sd7, sd8;

float time = 0;  //  カウンター

boolean btn1 = false;  

int drawFlag = 0;
int slotNo = 0;
int startFrame = 0;
int drawFrame = 0;

boolean previewMode = false;
void setup() { 
  size(800,200, P3D);
  canvas = createGraphics(1280, 720, P3D);
  MidiBus.list();
  myBus = new MidiBus(this, 0, -1); 
  server = new SyphonServer(this, "Processing Syphon - nanoBang");

  // import shader file
  sd1 = loadShader("shader/sketch1.glsl");
  sd2 = loadShader("shader/sketch2.glsl");
  sd3 = loadShader("shader/sketch3.glsl");
  sd4 = loadShader("shader/sketch4.glsl");
  sd5 = loadShader("shader/sketch5.glsl");
  sd6 = loadShader("shader/sketch6.glsl");
  sd7 = loadShader("shader/sketch7.glsl");
  sd8 = loadShader("shader/sketch8.glsl");

  ///GUI
  bg = loadImage("bg.png");
  cp5 = new ControlP5(this);
  for (int i=1;i<=8;i++) {
    cp5.addBang("btn"+i)
       .setPosition(170+i*80 - 80, 150)
       .setSize(40, 40)
       .setId(i)
       ;
  }
}

void draw() {
  time =(float)frameCount/60.0;

  drawFrame = frameCount - startFrame;
  background(150);
  image(bg, 0, 0);
  canvas.beginDraw();
  canvas.clear();
  if(drawFlag != 0){
    if(slotNo == 1 ){
      sd1.set("time", time);
      canvas.shader(sd1);
    }else if(slotNo == 2 ){
      sd2.set("time", time);
      sd2.set("resolution", float(canvas.width), float(canvas.height));
      canvas.shader(sd2);
    }else if(slotNo == 3 ){
      sd3.set("time", time);
      canvas.shader(sd3);
    }else if(slotNo == 4 ){
      sd4.set("time", time);
      canvas.shader(sd4);
    }else if(slotNo == 5 ){
      sd5.set("time", time);
      canvas.shader(sd5);
    }else if(slotNo == 6 ){
      sd6.set("time", time);
      canvas.shader(sd6);
    }else if(slotNo == 7 ){
      sd7.set("time", time);
      canvas.shader(sd7);
    }else if(slotNo == 8 ){
      sd8.set("time", time);
      canvas.shader(sd8);
    }
    canvas.rect(0, 0, canvas.width, canvas.height);
  }
  canvas.endDraw();

  // プレビューモード
  if(previewMode != true){
    server.sendImage(canvas);
  }
  // プレビュー描画
  image(canvas, 10,10, 150, 84.375);

  text(frameRate, 10, 120);
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
    slotSelect(1);
  } else if (number == 65) { 
    slotSelect(2);
  } else if (number == 66) { 
    slotSelect(3);
  } else if (number == 67) { 
    slotSelect(4);
  } else if (number == 68) { 
    slotSelect(5);
  } else if (number == 69) { 
    slotSelect(6);
  } else if (number == 70) { 
    slotSelect(7);
  } else if (number == 71) { 
    slotSelect(8);
  }
}

void slotSelect(int n){
  slotNo = n;
}

public void controlEvent(ControlEvent theEvent) {
  println(theEvent);
  for (int i=1;i<=8;i++) {
    if (theEvent.getController().getName().equals("btn"+i)) {
      slotSelect(i);
      drawFlag = 1;
    }
  }
}

void mouseReleased(){
  drawFlag = 0;
}