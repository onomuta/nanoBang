import themidibus.*;
MidiBus myBus;
MidiBus myBus1;
MidiBus myBus2;
MidiBus myBus3;
MidiBus myBus4;
MidiBus myBus5;
import codeanticode.syphon.*;
SyphonServer server;

PGraphics canvas;
PGraphics guiCanvas;
PImage bg;
PImage gui;

int shaderCount = 52; //slot数
PShader[] shaders = new PShader[shaderCount];
PImage[] thumbnails = new PImage[shaderCount];

float time = 0;  //  カウンター
float speed = 1;

boolean btn1 = false;  

int drawFlag = 0;
int slotNo = 0;
int startFrame = 0;
int drawFrame = 0;

int activeBtnX = 0;
int activeBtnY = 0;

int lastNote = -1;
int preNote = -1;
int preNote2 = -1;



boolean previewMode = false;
void setup() { 
  // fullScreen(P3D);
  size(1130,140,P3D);
  
  text("now loading..", 10, 10);
  MidiBus.list();
  myBus = new MidiBus(this, 0, -1); 
  myBus = new MidiBus(this, 1, -1); 
  myBus = new MidiBus(this, 2, -1); 
  myBus = new MidiBus(this, 3, -1); 
  myBus = new MidiBus(this, 4, -1); 
  myBus = new MidiBus(this, 5, -1); 
  server = new SyphonServer(this, "Processing Syphon - nanoBang");
  bg = loadImage("bg72.png");

  guiCanvas = createGraphics(960, 120, P3D);
  for (int i = 0; i < shaders.length; i++) {
    shaders[i] = loadShader("data/shader/sketch" + i + ".frag");
  }

  guiCanvas.beginDraw();
  for (int i = 0; i < shaders.length; i++) {
    shaders[i].set("time", 12.4321);
    // shaders[i].set("resolution", float(40), float(40));
    guiCanvas.shader(shaders[i]);

    if( i < 24){
      guiCanvas.rect(i * 40, 80, 40, 40);
    }else if(i < 48){
      guiCanvas.rect((i - 24) * 40, 40, 40, 40);
    }else if(i < 72){
      guiCanvas.rect((i - 48) * 40, 0, 40, 40);
    }
  }
  guiCanvas.endDraw();


  canvas = createGraphics(1280, 720, P3D);
}

float timeCount = 0;
void draw() {
  time =( (float)frameCount/60.0) %999.;
  // time =( (float)timeCount/60.0) %999.;
  // timeCount += 1 * speed;

  // drawFrame = frameCount - startFrame;
  background(0);

  image(bg, 0, 0);

  image(guiCanvas, 160,10, 960, 120);

  activeBtnDraw();

  canvas.beginDraw();
  canvas.clear();
  if(drawFlag != 0){
    if(slotNo < shaderCount){
      setShader(shaders[slotNo]);
    }else{
      setShader(shaders[0]);
    }
    canvas.rect(0, 0, canvas.width, canvas.height);
  }
  canvas.endDraw();

  // プレビューモード
  if(previewMode != true){
    server.sendImage(canvas);
  }
  // プレビュー描画
  image(canvas, 10,10, 142.222, 80);

  fill(200);
  text(frameRate, 10, 120);
  
  // println(pressNoteList);
}


void controllerChange(int channel, int number, int value) {
  println();
  println("Controller Change:");
  println("--------");
  println("Channel:"+channel);
  println("Number:"+number);
  println("Value:"+value);
  // if(number == 15){
  //   speed = 1. + (value/127.);
  // }
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

  // pitch:24 = C0
  slotSelect(pitch);

  preNote2 = preNote;
  preNote = lastNote;
  lastNote = pitch;
  println("p2;" + preNote2);
  println("p;" + preNote);
  println("l;" + lastNote);
}


void noteOff(int channel, int pitch, int velocity) {
  // Receive a noteOff
  println();
  print("Note Off:");
  print("--------");
  print("Channel:"+channel);
  print("Pitch:"+pitch);
  println("Velocity:"+velocity);

  if(pitch == preNote){
    preNote = preNote2;
    preNote2 = -1;
  }if(pitch == preNote2){
    preNote2 = -1;
  }else if(pitch == lastNote){
    if(preNote == -1){
      if(preNote2 == -1){
        drawFlag = 0;
        preNote2 = -1;
        preNote = -1;
        lastNote = -1;
      }else{
        lastNote = preNote2;
        slotSelect(lastNote);
        preNote2 = -1;
      }
    }else{
      lastNote = preNote;
      preNote = preNote2;
      preNote2 = -1;
      slotSelect(lastNote);
      
    }
  }

  println("p2;" + preNote2);
  println("p;" + preNote);
  println("l;" + lastNote);
}

void slotSelect(int n){
  if(drawFlag == 0){
    startFrame = frameCount;
  }
  slotNo = n;
  drawFlag = 1;
}


void activeBtnDraw(){
  if(drawFlag == 1){
    fill(255,120);
    stroke(255);
    if(slotNo >= 0 && slotNo <= 23){
      activeBtnX = slotNo * 40 + 160;
      rect(activeBtnX, 90, 40,40);
    }else if(slotNo >= 24 && slotNo <= 47){
      activeBtnX = (slotNo-24) * 40 + 160;
      rect(activeBtnX, 50, 40,40);
    }else if(slotNo >= 48 && slotNo <= 71){
      activeBtnX = (slotNo-48) * 40 + 160;
      rect(activeBtnX, 10, 40,40);
    }
    
  }
}

void sdSelect(){
  if(mouseY >90 && mouseY <= 130){
    if(mouseX >160 && mouseX < 1120){
      slotSelect(floor((mouseX-160)/40));
      activeBtnX = floor(mouseX/40) * 40;
      activeBtnY = 50;
      drawFlag = 1;
    }
  }else if(mouseY >50 && mouseY <= 90){
    if(mouseX >160 && mouseX < 1120){
      slotSelect(floor((mouseX-160)/40) + 24);
      activeBtnX = floor(mouseX/40) * 40;
      activeBtnY = 50;
      drawFlag = 1;
    }
  }else if(mouseY >10 && mouseY <= 50){
    if(mouseX >160 && mouseX < 1120){
      slotSelect(floor((mouseX-160)/40) + 48);
      activeBtnX = floor(mouseX/40) * 40;
      activeBtnY = 10;
      drawFlag = 1;
    }
  }
}
void mousePressed(){
  sdSelect();
}
void mouseDragged() {
  sdSelect();
}

void mouseReleased(){
  drawFlag = 0;
}

// time       : float :時間
// resolution : vec2  :解像度 
// baseColor  : vec3  :基本色 HSL(1,1,1)
void setShader(PShader sd){
  sd.set("time", time);
  // sd.set("resolution", float(canvas.width), float(canvas.height));

  sd.set("backbuffer", canvas);
  canvas.shader(sd);
}