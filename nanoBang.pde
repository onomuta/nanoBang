import themidibus.*;
MidiBus myBus;
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
    switch(slotNo) {
      case 1:
        setShader(sd1); break;
      case 2:
        setShader(sd2); break;
      case 3:
        setShader(sd3); break;
      case 4:
        setShader(sd4); break;
      case 5:
        setShader(sd5); break;
      case 6:
        setShader(sd6); break;
      case 7:
        setShader(sd7); break;
      case 8:
        setShader(sd8); break;
      case 9:
        // setShader(sd9); break;
      default:
        setShader(sd1); break;
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
  slotSelect(number - 63);
}

// note対応
void noteOn(int channel, int pitch, int velocity) {
  // Receive a noteOn
  println();
  print("Note On:");
  print("--------");
  print("Channel:"+channel);
  print("Pitch:"+pitch);
  println("Velocity:"+velocity);

  if(drawFlag == 0){
    drawFlag = 1;
    startFrame = frameCount;
  }

  // pitch:24 = C0
  slotSelect(pitch - 23);

}

void noteOff(int channel, int pitch, int velocity) {
  // Receive a noteOff
  println();
  print("Note Off:");
  print("--------");
  print("Channel:"+channel);
  print("Pitch:"+pitch);
  println("Velocity:"+velocity);

  drawFlag = 0;
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

// time       : float :時間
// resolution : vec2  :解像度 
// baseColor  : vec3  :基本色 HSL(1,1,1)
void setShader(PShader sd){
  sd.set("time", time);
  sd.set("resolution", float(canvas.width), float(canvas.height));
  canvas.shader(sd);
}