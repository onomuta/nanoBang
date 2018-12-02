// https://www.shadertoy.com/view/MtKBWw

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform sampler2D backbuffer;


#define PI 3.14159265358979323846

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec2 rand2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float circle(in vec2 _st, in vec2 _pos, in float _radius){
    vec2 dist = vec2(_st.x - _pos.x, _st.y - _pos.y);
    return 1.-smoothstep(_radius - 0.01, _radius + 0.01, dot(dist,dist) * 100.0);
}

void main(){
    vec2 st = gl_FragCoord.xy/resolution.xy;
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;
    p.x *= resolution.x/resolution.y;
    
    vec2 pos  = rand2(vec2(time + 9.99 ,0.)) * 2.;
    float r = rand(vec2(time + 9.99,0.1))*8.;
    float c1  = circle(p, pos, r);
    
    vec2 pos2 = rand2(vec2(time+ 9.99,1.1))* 2.;
    r = rand(vec2(time + 9.99,0.1))*8.;
    float c2 = circle(p, pos2, r);
    
    vec2 uv =  ( gl_FragCoord.xy / resolution.xy );
    vec4 hoge = texture2D(backbuffer, (uv- 0.1) *1.25)* 0.95;
    
    gl_FragColor = vec4(c1,c2,c2, 1.0);
    gl_FragColor += hoge;
}
