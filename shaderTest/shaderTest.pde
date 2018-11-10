PShader sd;  //  シェーダ
PShader sd2;  //  シェーダ
int times = 0;  //  カウンター
 
void setup() {
  size(600, 600, P3D);
  frameRate(60);
  sd = loadShader("FragmentShader.glsl");
  sd2 = loadShader("FragmentShader2.glsl");
}
 
void draw() {
  //  各パラメータをシェーダに渡す
  
  if (mousePressed == true) {
    sd.set("times", times);
    shader(sd);
  } else {
    sd2.set("times", times);
    shader(sd2);
  }
 
  times += mouseX/100;
 
  rect(0, 0, width, height);
  println(frameRate);
}

