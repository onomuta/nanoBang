//https://thebookofshaders.com/examples/?chapter=08
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

float random(in float x){
    return fract(sin(x)*43758.5453);
}

float random(in vec2 st){
    return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float rchar(in vec2 outer,in vec2 inner){
    float grid = 2.;
    vec2 margin = vec2(0.1, 0.1);
    float seed = 12.33;
    vec2 borders = step(margin,inner)*step(margin,1.-inner);
    return step(.5,random(outer*seed+floor(inner*grid))) * borders.x * borders.y;
}

float matrix(in vec2 st, in float s){
    float rows = 20.0;
    vec2 ipos = floor(st*rows + 1.0);

    ipos += vec2(.0,floor(-time*20.* s *random(ipos.x)));

    vec2 fpos = fract(st*rows);
    vec2 center = (.5-fpos);

    float pct = step(0.5,random(ipos));
    
    return rchar(ipos,fpos) * pct;

}

void main(){
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.y *= resolution.y/resolution.x;

    float s = 1.;
    float c1 = matrix(st,s);
    s = 1.2;
    float c2 = matrix(st,s);
    gl_FragColor = vec4(c1,c2,c2,1.0);
}
