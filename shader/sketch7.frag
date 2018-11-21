uniform vec2 resolution;
uniform float time;
const float PI = 3.1415926;
void main(){
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;
    vec3 line = vec3(0.0);
    float c1 = 0.;
    float c2 = 0.;
    for(float fi = 0.0; fi < 20.0; ++fi){
        float offset = fi * PI / 100.0;
        float timer = time * fi * 0.12;
        c1 += 0.005 / abs(p.y + sin(p.x * 2.0 + timer + offset) * 0.75 * (fi/20. + 0.5));
        c2 += 0.005 / abs(p.y + sin(p.x * 2.3 + timer + offset) * 0.75 * (fi/20. + 0.5));
    }
    
    c1 = pow(c1, 3.);
    c2 = pow(c2, 3.);
    gl_FragColor = vec4(c1,c2,c2, 1.0);
}
