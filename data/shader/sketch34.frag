#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

#define PI 3.14159265358979323846

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec2 rand2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float border(in vec2 _st, in vec2 _pos, in float _width){
    float  c = 1. - smoothstep(_width, _width + 0.013, distance(_st.y, _pos.y));
    return c;
}

void main(){
    vec2 st = gl_FragCoord.xy/resolution.xy;
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;
    p.x *= resolution.x/resolution.y;
    
    vec2 pos  = rand2(vec2(time,0.));
    float w = rand(vec2(time,0.1))*0.2;
    float c1  = border(p, pos, w);
    
    vec2 pos2 = rand2(vec2(time,12345.1));
    w = rand(vec2(time,2.1))*0.2;
    float c2 = border(p, pos2, w);
    gl_FragColor = vec4(c1,c2,c2, 1.0);
}
