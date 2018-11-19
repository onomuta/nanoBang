uniform vec2 resolution;
uniform float time;

float swirl(vec2 coord)
{
    float l = length(coord) / resolution.x;
    float phi = atan(coord.y, coord.x + 1e-6);
    return sin(l * 100. + phi - time * 8.) ;
}

float halftone(vec2 coord, float s)
{
    coord -= resolution * 0.5;
    float size = resolution.x / 30. * s;
    vec2 uv = coord / size; 
    vec2 ip = floor(uv); // column, row
    vec2 odd = vec2(0.5 * mod(ip.y, 2.), 0.); // odd line offset
    vec2 cp = floor(uv - odd) + odd; // dot center
    float d = length(uv - cp - 0.5) * size; // distance
    float r = swirl(cp * size) * (size - 10.) * 0.6; // dot radius
    return 1. - clamp(d - r, 0., 1.);
}

void main(void)
{
  float c2 = halftone(gl_FragCoord.xy, 1.2);
    gl_FragColor = vec4(halftone(gl_FragCoord.xy, 1.4), c2 , c2 , 1);
}