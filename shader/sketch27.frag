uniform vec2 resolution;
uniform float time;

#define PI 3.1415926535897932384626433832795
vec2 wave(vec2 st, float freq) {
    st.y += cos(st.x*freq);
    return st;
}

vec2 zigzag(vec2 st, float freq) {
    st.y += mix(abs(floor(sin(st.x*3.1415))),abs(floor(sin((st.x+1.)*3.1415))),fract(st.x*freq));
    return st;
}

float line(vec2 st, float width) {
    return step(width,1.0-smoothstep(.0,1.,abs(sin(st.y*PI))));
}

void main(){
    
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;

    vec2 st1 = st;
    vec2 st2 = st;
  
    st1 *= 9.;
    st1.x -= time;
    st1 = wave(st1, 2.);
    float c1 = line(st1,.5);
      
    st2 *= 7.;
    st2.x += time;
    st2 = wave(st2, 2.);
    float c2 = line(st2,.5);
    
    gl_FragColor = vec4(c1,c2,c2,1.0);
}