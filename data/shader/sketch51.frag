//https://gmork.in/webgl-study/?id=45
#ifdef GL_ES
precision mediump float;
#endif
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;


#define PI 3.141592653589
#define NUM 8.

float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    // vec2 u = f * f * (3. - 2. * f);
    vec2 u = smoothstep(0., 1., f);

    // Mix 4 coorners porcentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

vec2 rotate (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

void main (void) {
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    p *= .6;
    p += .3;

    float l = length(p);
    float c1 = 0.;
    float c2 = 0.;

        vec2 p1 = rotate(p, PI * .25);
        p1.x *= .3;
        p1 = rotate(p1, PI * -.25);
        c1 = noise(p1 * 10. * l * l - time * 8.);
        c1 += .03 / l;
        c2 = noise(p1 * 10. * l * l - time * 7.);
        c2 += .03 / l;

        vec2 pp = rotate(p, PI * .25);
        pp.x *= .7;
        pp.y *= .9;
        pp = rotate(pp, PI * -.25);

        c1 *= 1. - smoothstep(0.3, 0.5, length(pp * .8 - .2));
        c1 = step(.7, c1);
        
        c2 *= 1. - smoothstep(0.3, 0.5, length(pp * .8 - .2));
        c2 = step(.7, c2);

    gl_FragColor = vec4(c1,c2,c2, 1.);
}