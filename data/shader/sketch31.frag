//https://github.com/fand/webgl-study/blob/master/articles/28/index.frag
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform float spectrum;


#define PI 3.141592653

float rand (float v) {
    return sin(v * 123.4567) * 0.5 + 0.5;
}

void main() {
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);

    float l = length(p);
    l *= 12.;

    float freq = floor(rand(floor(l)) * 3. + 0.6);  // [2, 5)の整数
    float a = atan(p.y, p.x) * 2. ;  // [0, 2pi)
    float speed = rand(floor(l) * 3.) - 0.5; // [-0.5, 0.5)。freqとずらすために3倍している
    speed *= speed * speed * 30. + 2.; // 速度調整

    float c1 = (
        sin((a / 4.) * freq + speed * time) *
        abs(sin((a / 4.) * freq + time * 3. + floor(l) * 2.)) *
        abs(cos((a / 0.5) * freq + speed * time * 6. + floor(l)))
    );
    c1 = step(0.5, c1) ;
    
    speed = rand(floor(l) * 2.) - 0.5;
    speed *= speed * speed * 30. + 2.; // 速度調整
    float c2 = (
        sin((a / 4. ) * freq + speed * time) *
        abs(sin((a / 4.) * freq + time * 3. + floor(l) * 2.)) *
        abs(cos((a / 0.5) * freq + speed * time * 6. + floor(l)))
    );
    c2 = step(0.5, c2) ;

    
    gl_FragColor = vec4(c1, c2, c2, 1.0);
}