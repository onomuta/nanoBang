uniform vec2 resolution;
uniform float time;
const float PI = 3.1415926535897932384626433832795;

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

float stripes(vec2 st){
    st = rotate2d( PI*-0.25 ) * st*10.;
    return smoothstep(0.6 , 0.5 , abs(sin(st.x*PI)));
}

void main(){
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;
    st.x +=  time/4.;
    float c1 = stripes(st);
    st.x +=  time/10.;
    float c2 = stripes(st);
    gl_FragColor = vec4(c1,c2,c2, 1.0);
}
