uniform vec2 resolution;
uniform float time;
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 st = vec2(gl_FragCoord.x / resolution.x, gl_FragCoord.y/resolution.x);
    st *= 150.0 * 0.5;
    vec2 ipos = floor(st) * 1.001;
    
    float c1 = floor(random(ipos + floor(time * 10. * 0.5) + 1.) + 0.5);
    float c2 = floor(random(ipos + floor(time * 20. * 0.5)     ) + 0.5);
    gl_FragColor = vec4(c1,c2,c2,1.0);
}