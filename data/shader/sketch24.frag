// https://thebookofshaders.com/examples/?chapter=10
uniform vec2 resolution;
uniform float time;

float random (in float x) { return fract(sin(x)*1e4); }
float random (in vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123); }

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;
    float color = 0.0;

    vec2 grid = vec2(80.0, 4.0);

    float t = -time*max(grid.x,grid.y)/1.5;

    vec2 ipos = floor(st*grid);
    vec2 fpos = fract(st*grid);

    float value1 = random(floor(ipos.x+t)       )*1.1 ;
    float value2 = random(floor(ipos.x+t) + 99.9)*1.1;
    
    value1 *= value1 * value1;
    value2 *= value2 * value2;

    if (mod(ipos.y,2.) == 0.) {
        fpos = 1.0-fpos;
    }
    
    float c1 = 0.;
    float c2 = 0.;
    
    c1 += step(fpos.y*1.5,value1 );
    c2 += step(fpos.y*1.5,value2 );
    
    gl_FragColor = vec4(c1,c2,c2,1.0);
}
