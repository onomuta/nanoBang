// https://thebookofshaders.com/11/?lan=jp
uniform vec2 resolution;
uniform float time;

vec2 movingTiles(vec2 _st, float _zoom, float _speed){
    _st *= _zoom;
    float subTime = time*_speed;
    if( fract(subTime)>0.5 ){
        if (fract( _st.y * 0.5) > 0.5){
            _st.x += fract(subTime)*2.0;
        } else {
            _st.x -= fract(subTime)*2.0;
        }
    } else {
        if (fract( _st.x * 0.5) > 0.5){
            _st.y += fract(subTime)*2.0;
        } else {
            _st.y -= fract(subTime)*2.0;
        }
    }
    return fract(_st);
}

float circle(vec2 _st, float _radius){
    vec2 pos = vec2(0.5)-_st;
    return smoothstep(1.0-_radius,1.0-_radius+_radius*0.2,1.-dot(pos,pos)*3.14);
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;

    st = movingTiles(st,10., 1.5);
    vec2 st2 = movingTiles(st, 1., 1.5);

    float c1 = circle(st , (sin(time*10.)+1.)/5.  +0.1) ;
    float c2 = circle(st2, (cos(time*10.)+1.)/5. ) ;

    gl_FragColor = vec4(c1,c2,c2, 1.0);
}
