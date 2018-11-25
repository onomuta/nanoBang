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
    float  c = 0.8 - smoothstep(_width, _width + 0.15, distance(_st.y, _pos.y));
    return c;
}

float border2(in vec2 _st, in vec2 _pos, in float _width){
    float  c = 0.8 - smoothstep(_width, _width + 0.15, distance(_st.x, _pos.x));
    return c;
}

void main(){
    vec2 st = gl_FragCoord.xy/resolution.xy;
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution * 0.6;
    p.x *= resolution.x/resolution.y;
    
    float w = 0.;
    float c1 = 0.;
    float c2 = 0.;
    for(float i = 1.; i < 4.; i++){
        vec2 pos1  = rand2(vec2(time * i,0.));
        w = rand(vec2(time* i,0.1))*0.05;
        c1 += border(p, pos1, w);
        
        vec2 pos2 = rand2(vec2(time* i,123.1));
        w = rand(vec2(time* i,2.1))*0.05;
        c1 += border2(p, pos2, w);
    }
    
    for(float i = 1.; i < 4.; i++){
        vec2 pos1  = rand2(vec2(time * i+100.,0.));
        w = rand(vec2(time* i + 100. ,0.1))*0.01;
        c2 += border(p, pos1, w);
        
        vec2 pos2 = rand2(vec2(time* i+100.,125.1));
        w = rand(vec2(time* i + 100. ,2.1))*0.01;
        c2 += border2(p, pos2, w);
    }
//    
    c1 = smoothstep(c1 + 0.05, c1 - 0.05, 0.1);
    c2 = smoothstep(c2 + 0.05, c2 - 0.05, 0.1);
    gl_FragColor = vec4(c1,c2,c2, 1.0);
}
