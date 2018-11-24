uniform vec2 resolution;
uniform float time;
float random(in float x){
    return fract(sin(x)*43758.5453);
}

float random(in vec2 st){
    return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float rchar(in vec2 outer,in vec2 inner,in float sd){
    float grid = 1.;
    vec2 margin = vec2(.2,.05);
    float seed = sd;
    vec2 borders = step(margin,inner)*step(margin,1.-inner);
    return step(.5,random(outer*seed+floor(inner*grid))) * borders.x * borders.y;
}

vec3 matrix(in vec2 st, in float sd){
    float rows = 40.0;
    vec2 ipos = floor(st*rows);

    ipos += vec2(.0,floor(time*-25.*random(ipos.x)));

    vec2 fpos = fract(st*rows);
    vec2 center = (.5-fpos);

    float pct = random(ipos);
    float glow = (1.-dot(center,center)*3.)*2.0;

    vec3 color = vec3(0.643,0.851,0.690) * ( rchar(ipos,fpos,sd) * pct );
    color +=  vec3(0.027,0.180,0.063) * pct * glow;
    return vec3(rchar(ipos,fpos, sd) * pct * glow);
}


void main(){
    vec2 st = gl_FragCoord.st/resolution.xy;
    st.y *= resolution.y/ resolution.x;
    
    float c1 = matrix(st, 10.).x;
    float c2 = matrix(st, 20.).x;

    gl_FragColor = vec4(c1,c2,c2 , 1.0);
}
