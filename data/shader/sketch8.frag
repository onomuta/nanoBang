uniform vec2 resolution;
uniform float time;

void main(void){
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float s = sin(time *2.)*.2;
    float c = cos(time *1.63)*.15;
    
    vec2 v = vec2(c, s);
    s = sin(time *2.)*.3;
    c = cos(time *1.63)*.2;
    vec2 x = vec2(c, s);
    float f = sin(length(p + vec2( 0.5,  0.4) * v) *  4.0 - time *2.1);
    float e = sin(length(p + vec2(-0.2, -0.3) * x) * 7.0 - time *5.1);
    float g = sin(length(p + vec2(-0.7,  0.2) * x) * 11.0 - time *4.1);
    float h = sin(length(p + vec2( 0.1,  0.8) * v) * 10.0 - time *3.1);
    float c1 = 0.3 / (f     + g* h);
    float c2 = 0.3 / (f * e + g   );
    gl_FragColor = vec4(c1,c2,c2,1.0);
}