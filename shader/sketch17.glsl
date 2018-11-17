uniform vec2 resolution;
uniform float time;

void main(){
  vec2 st = gl_FragCoord.xy/resolution.xy;
  st = st *2. -1.;
  st.x *= resolution.x/resolution.y;

  vec3 color = vec3(0.0);
  float d = 0.0;
  

  float t = mod(time * 6. ,4.);
  d = t < 1.? length( abs(st)-1. ):
              t<2.? length( min(abs(st) - .2,0.)):
                    t<3.? length( st ):
                          length( max(abs(st)-.3,0.) );
    
  float c1 = sin(d * 20. - time * 20.);
  float c2 = sin(d * 20. + time * 18.);
  
  gl_FragColor = vec4(c1,c2,c2,1.0);
  
}