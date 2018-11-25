#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

#define PI 3.14159265358979323846

float wiggle(float t){
t = t/6.0;
    return sin(t*0.921 +0.4321) + cos(t*0.8122 +0.1321) + sin(t) + cos(t*0.7123 +0.5132) + sin(t*1.1232 + 0.921);
}

float circle(in vec2 _st, in vec2 _pos, in float _radius){
    vec2 dist = vec2(_st.x - _pos.x, _st.y - _pos.y);
    return 1.-smoothstep(_radius - 100., _radius + 200.0, dot(dist,dist) * 120.0);
}

void main(){
    vec2 st = gl_FragCoord.xy/resolution.xy;
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution * 2.;
    p.x *= resolution.x/resolution.y;
    
    float w = 0.;
    float c1 = 0.;
    float c2 = 0.;
    for(float i = 1.; i < 8.; i++){
        vec2 pos1  = vec2(wiggle(time * 20. + (i+1.)*1234.567),wiggle(time * 18.23141 + (i+1.)*1234.567));
        w = (wiggle(time * 1.81324+ (i+1.)*134.567) + 2. )*8.;
        c1 += circle(p, pos1, w);
        vec2 pos2  = vec2(wiggle(time * 22.142+ (i+1.)*124.567),wiggle(time * 19.134511+ (i+1.)*1234.567));
        w = (wiggle(time * 21.142+ (i+1.)*1234.567) + 2. )*8.;
        c2 += circle(p, pos2, w);
    }
    
    c1 = fract(c1);
    c1 = smoothstep(c1 + 0.1, c1 - 0.1, 0.5);

    c2 = fract(c2);
    c2 = smoothstep(c2 + 0.1, c2 - 0.1, 0.5);
    gl_FragColor = vec4(c1,c2,c2, 1.0);
}
