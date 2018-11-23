uniform vec2 resolution;
uniform float time;
// uniform vec2  mouse;

vec3 hsv(float h, float s, float v){
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

float circle(vec2 coord, vec2 seed)
{
    float reso = 24.;
    float cw = resolution.x / reso;

    vec2 p = mod(coord, cw);
    float d = distance(p, vec2(cw / 2.0));

    float rnd = dot(floor(coord / cw), seed);
    float t = time * 2.5 + fract(sin(rnd)) * 6.2;

    float l = cw * (sin(t) * 0.25 + 0.2);
    return clamp(l - d, 0.0, 1.0);
}

void main()
{
    vec2 p = gl_FragCoord.xy;
    vec2 dp = vec2(-30., -300.) * time;
    float c1 = circle(p + dp, vec2(1., 1.));
    float c2 = circle(p + dp, vec2(2., 1.));
    float c3 = circle(p + dp, vec2(3., 1.));
    float r = max(0.0, c1);
    float g = max(0.0, c2);
    float b = max(0.0, c2);
    gl_FragColor = vec4(r, g, b, 1);
}