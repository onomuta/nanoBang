uniform vec2 resolution;
uniform float time;
void main() {
    vec2 m = vec2(0.5, 0.5 * (resolution.y / resolution.x));
    vec2 p = gl_FragCoord.xy / resolution.x;
    float speed =  2.0;
    float r = pow(sin(length(m - p) * 10.0 - time * 14.0), 3.0) * 4.0;
    float g = pow(sin(length(m - p) * 11.0 - time * 22.0), 3.0) * 4.0;
    float b = pow(sin(length(m - p) * 12.0 - time * 22.0), 3.0) * 4.0;
    gl_FragColor = vec4(r, g, b, 1.0);
}