#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec2 resolution;

float rand(vec2 uv)
{
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 uv2tri(vec2 uv)
{
    float sx = uv.x - uv.y / 2.; // skewed x
    float sxf = fract(sx);
    float offs = step(fract(1. - uv.y), sxf);
    return vec2(floor(sx) * 2. + sxf + offs, uv.y);
}

float tri(vec2 uv)
{
    float sp = 1.2 + 20.3 * rand(floor(uv2tri(uv)));
    return max(0., sin(sp * time));
}

void main(void)
{
    vec2 uv = (gl_FragCoord.xy - resolution.xy / 2.) / resolution.y;

    float t1 = -time / .5;
    float t2 = t1 + 0.5;

    float c1 = tri(uv * (2. + 8. * fract(t1)) + floor(t1));
    float c2 = tri(uv * (2. + 8. * fract(t2)) + floor(t2));
    
    gl_FragColor = vec4(c1,c2,c2,1.0);
}