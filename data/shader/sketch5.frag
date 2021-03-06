#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

const float PI = 3.1415926535;

void main(void)
{
    vec2 coord = gl_FragCoord.xy - resolution * 0.5;

    float phi = atan(coord.y, coord.x + 1e-6);
    phi = phi / PI * 0.5 + 0.5;
    float seg = floor(phi * 6.);

    float theta = (seg + 0.5) / 6. * PI * 2.;
    vec2 dir1 = vec2(cos(theta), sin(theta));
    vec2 dir2 = vec2(-dir1.y, dir1.x);

    float l = dot(dir1, coord);
    float w = sin(seg * 33.374) * 1. + 13.;
    float prog = l / w + time * 2.;
    float idx = floor(prog);

    float phase = time * 0.8;
    float th1 = fract(273.84937 * sin(idx * 54.67458 + floor(phase    )));
    float th2 = fract(273.84937 * sin(idx * 54.67458 + floor(phase + 1.)));
    float thresh = mix(th1, th2, smoothstep(0.75, 1., fract(phase)));

    float l2 = dot(dir2, coord);
    float slide = fract(idx * 32.74853) * 100. * time;
    float w2 = fract(idx * 39.721784) * 400.;
    float prog2 = (l2 + slide) / w2;

    float c1 = clamp((fract(prog) - thresh + 0.2) * w * 0.5, 0., 1.);
    c1 *= clamp((fract(prog2) - 1. + thresh- 0.2) * w2 * 0.5, 0., 1.);
    
    float c2 = clamp((fract(prog) - thresh -0.2) * w * 0.5, 0., 1.);
    c2 *= clamp((fract(prog2) - 1. + thresh +0.2) * w2 * 0.5, 0., 1.);

    gl_FragColor = vec4(c1, c2, c2, 1);
}