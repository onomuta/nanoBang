uniform vec2 resolution;
uniform float time;
float random (in float x) { return fract(sin(x)*1e4); }
float random (in vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123); }

vec2 tile(vec2 _st, float _zoom){
  _st *= _zoom;
  return fract(_st);
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size* 1.0;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size*0.8 ,_size*0.15)) +
            box(_st, vec2(_size*0.15,_size*0.8));
}

void main(){
  vec2 st = gl_FragCoord.xy/resolution.xy;
  st.x *= resolution.x/resolution.y;
  
  vec2 st1 = st;
  vec2 st2 = st;
  st1 +=  -time/10.;
  st1 = tile(st1,10.0);
  float c1 = clamp(cross(fract(st1),0.3),0.0,1.0);
  st2 +=  -time/8.;
  st2 = tile(st2,12.0);
  float c2 = clamp(cross(fract(st2),0.3),0.0,1.0);

  gl_FragColor = vec4(c1,c2,c2,1.0);
}