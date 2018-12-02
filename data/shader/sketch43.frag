#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

uniform sampler2D prevFrame;
uniform sampler2D prevPass;

uniform sampler2D backbuffer;

varying vec3 v_normal;
varying vec2 v_texcoord;

vec2 rotate(vec2 v, float a) {float s = sin(a);float c = cos(a);mat2 m = mat2(c, -s, s, c);return m * v;}

float random (in float x) { return fract(sin(x)*1e4); }
float random (in vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123); }

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;
    st = rotate(st, time);
    float color = 0.0;

    vec2 grid = vec2(100.0, 4.0);

    float t = -time*max(grid.x,grid.y)/1.5;

    vec2 ipos = floor(st*grid);
    vec2 fpos = fract(st*grid);

    float value1 = random(floor(ipos.x+t * 2.)       )*.65 ;
    float value2 = random(floor(ipos.x+t * 2.) + 99.9)*.65;
    
    value1 *= value1 * value1;
    value2 *= value2 * value2;

    if (mod(ipos.y,2.) == 0.) {
        fpos = 1.0-fpos;
    }
    
    float c1 = 0.;
    float c2 = 0.;
    
    c1 += step(fpos.y,value1 );
    c2 += step(fpos.y,value2 );
    
    vec2 uv =  ( gl_FragCoord.xy / resolution.xy );
    vec4 hoge = texture2D(backbuffer, (uv- 0.165) *1.5)* 0.95;
    

    gl_FragColor = vec4(c1,c2,c2, 1.0);
    gl_FragColor += hoge;
}
