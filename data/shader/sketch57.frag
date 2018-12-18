//https://docs.google.com/presentation/d/1NMhx4HWuNZsjNRRlaFOu2ysjo04NgcpFlEhzodE8Rlg

#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

uniform sampler2D prevFrame;
uniform sampler2D prevPass;

varying vec3 v_normal;
varying vec2 v_texcoord;

float rand(vec2 st)
{
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
}

float box(vec2 st, float size)
{
    size = 0.5 + size /2. -0.1;
    st = vec2(step(st.x, size),step(st.y, size)) * vec2(step(1.0 - st.x, size),step(1.0 - st.y, size));
    return st.x * st.y;
}

float wave(vec2 st, float n)
{
    st = (floor(st * n) + 0.5) / n ;
    float d = distance(vec2(0.5,0.5), st);
    return (1. + sin(d * 6. + time * 8.)) * 0.5;
}

float box_wave(vec2 uv, float n)
{
    vec2 st = fract(uv * n);
    float size = wave(uv, n);
    return box(st, size -0.2);
}

float box_size(vec2 st, float n)
{
    st = (floor(st * n) + 0.5) / n;
    float offs = rand(st) * 3.;
    return (1. + sin(time * 4. + offs)) * 0.5;
}

float box_size2(vec2 st, float n)
{
    st = (floor(st * n) + 0.5) / n;
    float offs = rand(st) * 5.;
    return (1. + sin(time * 4. + offs)) * 0.5;
}


vec2 rotate (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

void main(void)
{
    float c1 = 0.;
    float c2 = 0.;
    float n = 10.;

    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;
    
    st.y -= 999.;
    
    st = rotate(st , radians(45.) );
    
    //repeat
    vec2 fst = fract(st * n);
    //step
    vec2 ist = floor(st * n);
    
    c2 = box_wave(st, n );
    st.y += .3;
    c1 = box_wave(st, n );
    
    gl_FragColor = vec4(c1, c2, c2, 1.0);
}