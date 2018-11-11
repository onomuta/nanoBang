uniform vec2 resolution;
uniform float time;

const float PI = 3.1415926;

void main(){
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float s = sin(time * 0.115);
    float c = cos(time * 0.055);
    vec2 v = vec2(c, s);
    s = sin(time * 0.035);
    c = cos(time * 0.065);
    vec2 x = vec2(c, s);
    float f = sin(length(p + vec2( 0.5,  0.4) * v) *  4.0 - time);
    float e = sin(length(p + vec2(-0.2, -0.3) * x) * 17.0 - time);
    float g = sin(length(p + vec2(-0.7,  0.2) * x) * 11.0 - time);
    float h = sin(length(p + vec2( 0.1,  0.8) * v) * 27.0 - time);
    float i = 0.75 / (f * e + g * h);
    gl_FragColor = vec4(vec3(abs(i)) * vec3(0.25, p * 1.25), 1.0);
}
