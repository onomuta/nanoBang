//https://thebookofshaders.com/12/?lan=jp

#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec2 resolution;
vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy/ resolution.xy;
    st.x *= resolution.x/ resolution.y;
    vec3 color = vec3(.0);
    float c1 = 0.;
    float c2 = 0.;
    
    float speed = 8.;
    float t = sin(time * speed / 4.) * 10.;

    // Scale
    st *=12.;
    st.y += -t;

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 1.;  // minimun distance

    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x),float(y));
            vec2 point = random2(i_st + neighbor);
            point = 0.5 + 0.5*sin( t + 6.2831*point);
            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);
            m_dist = min(m_dist, dist);
        }
    }
  
    c2 = step(m_dist *1. , 0.1);


    m_dist = 1.;
//    i_st.x += 0.01;
    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x),float(y));
            vec2 point = random2(i_st + neighbor);
            point = 0.5 + 0.5*sin( t - 6.2831*point);
            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);
            m_dist = min(m_dist, dist);
        }
    }    
    c1 = step(m_dist *1. , 0.3 * (1. - abs(sin(time * speed /4. ))) );
    
    gl_FragColor = vec4(c1, c2, c2, 1.0);
}