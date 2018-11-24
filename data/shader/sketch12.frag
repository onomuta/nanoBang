uniform vec2 resolution;
uniform float time;
float circle(vec2 coord, float spd)
{
    float reso = 16.0;
    float cw = resolution.x / reso;

    vec2 p = mod(coord, cw);
    float d = distance(p, vec2(cw / 2.0));

    float rnd = dot(floor(coord / cw), vec2(1323.443, 1412.312));
    float t = time * 8.0 + abs(sin(rnd)) * 10.2;

    float l = cw * (sin(t * spd) * 1. - 0.);
    return clamp(l - d, 0.0, 1.0);
}

void main()
{
    vec2 p = gl_FragCoord.xy;
    vec2 dp = vec2(7.9438, 1.3335) * time;
    float c1 = circle(p - dp, 1.0);
    float c2 = circle(p + dp, 1.1);
    gl_FragColor = vec4(c1, c2, c2, 1);
}