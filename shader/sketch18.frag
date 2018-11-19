uniform vec2 resolution;
uniform float time;

float circle(in vec2 _st, in vec2 _pos, in float _radius){
    vec2 dist = vec2(_st.x - _pos.x, _st.y - _pos.y);
    return 1.-smoothstep(_radius - 0.1,
                         _radius + 0.1,
                         dot(dist,dist) * 100.0);
}

void main(void)
{
    vec2 p  = gl_FragCoord.xy / resolution.x;
    p = vec2(p.x*2.0 - 1.0 , p.y*2.0 - (resolution.y/resolution.x));
    
    vec2 pos = vec2(0.0, 0.0);
    float c1;
    float c2;
    for(float i = 0.; i < 50.; i ++){
      pos = vec2( (i - 25.)/22. , mod(time * 0.01 + i*0.3,2.0) - 1.);
      c1 += circle(p, pos, (sin(time* -10. + i)));
      c2 += circle(p, pos, (sin(time* -10. + i + 1.)));
    }
    
    gl_FragColor = vec4(c1, c2, c2, 1.0);
}