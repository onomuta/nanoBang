// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

// My own port of this processing code by @beesandbombs
// https://dribbble.com/shots/1696376-Circle-wave

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Value Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float shape1(vec2 st, float radius) {
    st = vec2(0.5)-st;
    float r = length(st)*2.0;
    float a = atan(st.y,st.x);
    float m = abs(mod(a+time*-8.5, 3.14*2.)-3.14)/3.;
    float f = radius;
    m += noise(st+time*0.1)*.5;
    f += sin(a*50.)*noise(st+time*.2)*.1;
    f += (sin(a*20.)*.12*pow(m,4.));
    return 1.-smoothstep(f,f+0.007,r);
}

float shapeBorder1(vec2 st, float radius, float width) {
    return shape1(st,radius)-shape1(st,radius-width);
}

float shape2(vec2 st, float radius) {
    st = vec2(0.5)-st;
    float r = length(st)*2.0;
    float a = atan(st.y,st.x);
    float m = abs(mod(a+time*6.0 + 10. , 3.14*2.)-3.14)/3.;
    float f = radius;
    m += noise(st+time*.2)*.5;
    f += sin(a*50.)*noise(st+time*.2)*.1;
    f += (sin(a*20.)*.1*pow(m,4.));
    return 1.-smoothstep(f,f+0.007,r);
}

float shapeBorder2(vec2 st, float radius, float width) {
    return shape2(st,radius)-shape2(st,radius-width);
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;
    st.x -= 0.4;
    float c1 =  shapeBorder1(st,0.7 * abs(cos(time)) + 0.4,  0.1);
    float c2 =  shapeBorder2(st,0.8 * abs(sin(time)) + 0.4, 0.1);
    c1 +=       shapeBorder1(st,0.2 * abs(cos(time)) + 0.4, 0.1);
    c2 +=       shapeBorder2(st,0.3 * abs(sin(time)) + 0.4, 0.1);
    c1 +=       shapeBorder1(st,1.3 * abs(cos(time)) + 0.4, 0.1);
    c2 +=       shapeBorder2(st,1.4 * abs(sin(time)) + 0.4, 0.1);

    gl_FragColor = vec4(c1,c2,c2, 1.0 );
}