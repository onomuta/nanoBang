#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

#define PI 3.14159265358979323846

float wiggle(float t){
t = t/6.0;
    return (sin(t*0.921 +0.4321) + cos(t*0.3122 +0.1321) + sin(t) + cos(t*0.7123 +0.5132) + sin(t*0.1232 + 0.921) )/5.;
}

float circle(in vec2 _st, in vec2 _pos, in float _radius){
    vec2 dist = vec2(_st.x - _pos.x, _st.y - _pos.y);
    return 1.-smoothstep(_radius - 100., _radius + 200.0, dot(dist,dist) * 110.0);
}

void main(){
    vec2 st = gl_FragCoord.xy/resolution.xy;
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution * 2.;
    p.x *= resolution.x/resolution.y;
    
    float t = time * 4.0;
    float w = 0.;
    float c1 = 0.;
    float c2 = 0.;
    for(float i = 1.; i < 9.; i++){
        vec2 pos1 = vec2(wiggle(t * 10. + (i+1.)*111.0),wiggle(t * 10.+ (i+1.)*422.0));
        pos1 *= 2.0;
        w = wiggle(t + (i+1.)*13.567);
        c1 += circle(p, pos1, w);
        
        vec2 pos2 = vec2(wiggle(t * 10. + (i+1.)*212.0),wiggle(t * 10. +(i+1.)*322.0));
        pos2 *= 2.0;
        w = wiggle(t + (i+1.)*34.567);
        c2 += circle(p, pos2, w);
    }
    
    c1 = smoothstep(c1 + 0.1, c1 - 0.1, 0.5);
    c1 += step(0.5,c1);

    c2 = smoothstep(c2 + 0.1, c2 - 0.1, 0.5);
    c2 += step(0.5,c2);

    gl_FragColor = vec4(c1,c2,c2, 1.0);
}
