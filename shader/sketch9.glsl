uniform vec2 resolution;
uniform float time;
const float NEON_WIDTH = 50.0;
 
void main()
{
  vec4 col = vec4(0, 0, 0, 0);
 
  //  正弦波（sin）を使って基準点を決める。
  float h = sin(radians(gl_FragCoord.x + (time*100.) ));
  h *= 100.0;
  h += 350;
 
  //  cは、座標が波形の位置ぴったりであれば1.0。そこからNEON_WIDTHの範囲内であれば、距離に応じて1.0～0.0となる。
  float t = abs(gl_FragCoord.y - h) / NEON_WIDTH;
  float c = 1.0 - t;
 
  //  結果が0より大きければ、色を加算する。
  if(c > 0.0)
  {
    c = pow(c, 3.0);
    vec3 rc = vec3(c, c, c);
    col += vec4(rc, 1);
  }
  gl_FragColor = vec4(col);
}