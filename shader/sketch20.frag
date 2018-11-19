uniform vec2 resolution;
uniform float time;

float random (in float x) {
    return fract(sin(x)*1e4);
}

float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

float pattern(vec2 st, vec2 v, float t) {
    vec2 p = floor(st+v);
    return step(t, random(100.+p*.00001)+random(p.x)*0.9 );
}

void main(void) {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;

    vec2 grid = vec2(100.0, 5.);
    st *= grid;

    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction

    vec2 vel = vec2(time*2.*max(grid.x,grid.y)); // time
    vel *= vec2(-1.,0.0) * random(1.0+ipos.y); // direction

    // Assign a random value base on the integer coord
    vec2 offset = vec2(10.,10.);

    vec3 color = vec3(0.);
    color.r = pattern(st+offset,vel,0.5);
    color.g = pattern(st,vel,0.5 );
    color.b = pattern(st,vel,0.5);

    // Margins
    color /= step(0.1,fpos.y);

    gl_FragColor = vec4(1.-color,1.0);
}
