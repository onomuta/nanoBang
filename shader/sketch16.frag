uniform vec2 resolution;
uniform float time;

void main() {
    vec2 p = (gl_FragCoord.xy / resolution.xy - 0.5) * 25.0;
    p *= sin(p);
    float r = sin(p.x + p.y + time * 14.);
    float g = sin(p.x + p.y + time * 19.);
    
    gl_FragColor = vec4(r, g, g, 1.);
}