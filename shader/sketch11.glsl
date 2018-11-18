uniform vec2 resolution;
uniform float time;
float circle(vec2 coord, vec2 offs)
{
    float reso =16.0;
    float cw = resolution.x / reso;

    vec2 p = mod(coord, cw) + offs * cw;
    float d = distance(p, vec2(cw / 2.0));

    vec2 p2 = floor(coord / cw) - offs;
    vec2 gr = vec2(0.443, 0.312);
    float t = time * -12.0 + dot(p2, gr);

    float l = cw * (sin(t) +1.4) * 0.14;
    float lw = max(0.,sin(t)*2.);
    return max(0.0, 5.0 - abs(l - d) / lw);
}

void main()
{
    float c1 = 0.0;
    float c2 = 0.0;
    for (int i = 0; i < 9; i++){
        float dx = mod(float(i), 3.0) - 1.0;
        float dy = float(i / 3) - 1.0;
        c1 += circle(gl_FragCoord.xy, vec2(dx, dy));
        c2 += circle(gl_FragCoord.xy + 15., vec2(dx, dy));
    }
    gl_FragColor = vec4(c1,c2,c2, 1);
}