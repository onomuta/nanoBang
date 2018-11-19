uniform vec2 resolution;
uniform float time;
const float PI = 3.141592;

void main(void)
{
    vec2 coord = gl_FragCoord.xy - resolution * 0.5;

    float phi = atan(coord.y, coord.x + 1e-6);
    phi = phi / PI * 0.5 + 0.5;
    float seg = floor(phi * 6.);

    float theta = (seg + 0.5) / 6. * PI * 2.;
    vec2 dir = vec2(cos(theta), sin(theta));
    float l = dot(dir, coord);

    float phase = time * 1.8;
    float w1 = 80.;
    float w2 = 1000.;
    float w = mix(w1, w2, smoothstep(0.75, 1., fract(phase)));


    float prog = l / w + time * 4.2;
    float thresh = fract(73.8493748 * abs(sin(floor(prog) * 4.67458347)));
    float c1 = clamp((fract(prog) - thresh) * w * 0.3, 0., 1.);
    
    float prog2 = l / w + time * 5.;
    float thresh2 = fract(73.8493748 * abs(sin(floor(prog2) * 4.67458347)));
    float c2 = clamp((fract(prog2) - thresh2) * w * 0.3, 0., 1.);

    gl_FragColor = vec4(c1, c2, c2, 1);
}