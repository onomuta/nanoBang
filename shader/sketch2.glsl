uniform vec2 resolution;
uniform float time;


float uvrand(vec2 uv)
{
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}

float uvrand2(vec2 uv)
{
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 4375.5453);
}

void main(void)
{
    vec2 p = (gl_FragCoord.xy) / resolution.x;

    vec2 ro = vec2(0.5, 0.5); // rect origin
    vec2 rw = vec2(0.5, 0.5); // rect extent (half width)
    float t = floor(time* 6.);

    for (float i = 0.; i < 6.; i++)
    {
        if (uvrand(ro + t) < 0.05 * i) break;
        rw *= 0.5;
        ro += rw * (step(ro, p) * 2. - 1.);
    }

    float rnd = uvrand(ro);
    float rnd2 = uvrand2(ro);

    vec2 sl = rnd < 0.5 ? vec2(1,0) : vec2(0,1); // sliding param
    sl *= 2. * rw * (1. - smoothstep(0., 0.5, fract(time* 6.)));

    vec2 cp = (abs(rw - p + ro) - sl) * resolution.y - 2.; // rect fill
    float c1 = clamp(min(cp.x, cp.y), 0., 1.);
    float c2 = clamp(min(cp.x, cp.y), 0., 1.);
    float c3 = clamp(min(cp.x, cp.y), 0., 1.);

    c1 *= step(0.5, rnd  * (1. - abs(floor(p.x)))); // outside
    c2 *= step(0.5, rnd2 * (1. - abs(floor(p.x)))); // outside

    gl_FragColor = vec4(c1, c2, c2, 1);
}