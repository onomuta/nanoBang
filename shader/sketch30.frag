//https://thebookofshaders.com/examples/?chapter=09
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

#define PI 3.14159265358979323846

float rows = 10.0;

vec2 brickTile(vec2 _st, float _zoom){
  _st *= _zoom;
//  if (fract(_st.y * 0.5) > 0.5){
//      _st.x += 0.5;
//  }
  return fract(_st);
}

float circle(vec2 _st, float _radius){
  vec2 pos = vec2(0.5)-_st;
  _radius *= 0.75;
  return 1.-smoothstep(_radius-(0.1),_radius+(0.1), dot(pos,pos)*PI);
}

void main(){
  float t = time * .8;

  vec2 st = gl_FragCoord.xy/resolution.xy;
  st.x *= resolution.x/resolution.y;
  st = brickTile(st,5.);
  float c1 = circle(st+vec2(0.0 , mod(t,2.0)-1.0), 0.1) + circle(st+vec2(0.0 , mod(t + 1.0,2.0)-1.0), 0.1);
  c1 += circle(st+vec2(mod(t,2.0)-1.0 , 0.0), 0.2) + circle(st+vec2(mod(t + 1.0,2.0)-1.0 , 0.0), 0.2);
  c1 = step(0.5,c1);
  
  float c2 = circle(st+vec2(0.0 , mod(-t,2.0)-1.0), 0.1) + circle(st+vec2(0.0 , mod(-t + 1.0,2.0)-1.0), 0.1);
  c2 += circle(st+vec2(mod(-t,2.0)-1.0 , 0.0), 0.2) + circle(st+vec2(mod(-t + 1.0,2.0)-1.0 , 0.0), 0.2);
  c2 = step(0.5,c2);
  gl_FragColor = vec4(c1,c2,c2,1.0);
}
