uniform vec2 resolution;
uniform float time;
float circle(vec2 coord, vec2 offs)
{
    float reso = 16.0;
    float cw = resolution.x / reso;

    vec2 p = mod(coord, cw) - cw * 0.5 + offs * cw;

    vec2 p2 = floor(coord / cw) - offs;
    vec2 gr = vec2(2.9, 0.272);
    float tr = time * - 2.4;
    float ts = tr + dot(p2, gr);

    float sn = sin(tr), cs = cos(tr);
    p = mat2(cs, -sn, sn, cs) * p;

    float s = cw * (0.9 + 0.6 * sin(ts * 2.3 ));
    float d = max(abs(p.x), abs(p.y));

    return max(0.0, 60.0 - s - d);
}

void main()
{
    float c1 = 0.0;
    float c2 = 0.0;

    for (int i = 0; i < 9; i++)
    {
        float dx = mod(float(i), 3.0) - 1.0;
        float dy = float(i / 3) - 1.0;
        c1 += circle(gl_FragCoord.xy, vec2(dx, dy));
        c2 += circle(gl_FragCoord.xy + 80., vec2(dx, dy)) ;
    }
    gl_FragColor = vec4(c1,c2,c2, 1);
}