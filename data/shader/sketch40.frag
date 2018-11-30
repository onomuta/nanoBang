#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
#define PI 3.14159265358979323846

// Description : Array and textureless GLSL 2D/3D/4D simplex noise functions.//      Author : Ian McEwan, Ashima Arts.//  Maintainer : ijm//     Lastmod : 20110822 (ijm)//     License : Copyright (C) 2011 Ashima Arts. All rights reserved. Distributed under the MIT License. See LICENSE file.//               https://github.com/ashima/webgl-noise
vec3 mod289(vec3 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 permute(vec4 x) {return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
////////////////////////////////////////////////////////////////////////
vec2 rotate(vec2 v, float a) {float s = sin(a);float c = cos(a);mat2 m = mat2(c, -s, s, c);return m * v;}
float rand(vec2 co){return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}

float wiggle(float t){
    t = t/6.0;
    return sin(t*0.921 +0.4321) + cos(t*0.8122 +0.1321) + sin(t) + cos(t*0.7123 +0.5132) + sin(t*1.1232 + 0.921);
}

float circle(in vec2 _st, in vec2 _pos, in float _radius){
    vec2 dist = vec2(_st.x - _pos.x, _st.y - _pos.y);
    return 1.-smoothstep(_radius - 100., _radius + 200.0, dot(dist,dist) * 120.0);
}
float border(in vec2 _st, in vec2 _pos, in float _width){
    float  c = 1.0 - smoothstep(_width-0.2, _width + 0.2, distance(_st.y, _pos.y));
    return c;
}
float border2(in vec2 _st, in vec2 _pos, in float _width){
    float  c = 0.8 - smoothstep(_width, _width + 0.15, distance(_st.x, _pos.x));
    return c;
}

void main(){
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution * 2.;
    float speed = 1.0;
    float scale = 0.2;
    p.x *= resolution.x/resolution.y;
    float w = 0.;
    float c1 = 0.;
    float c2 = 0.;
    float zure = snoise(vec3(p.y*1., 0., rand( vec2(0., floor(time *20.)*10.) ) ));
    p.x += floor(zure)  ;
    float zure2 = snoise(vec3(p.x*1., 0., rand( vec2(0., floor(time *20.)*10.) ) ));
    p.x += time * -5.;
    p.y += time * -10. + tan(time + sin(time/0.1))*-1.;
    vec2 p1 = p * scale;
    p1.x += 2.;
    c1 = snoise(vec3(p1, time * speed));
    c1 = smoothstep(c1 + 0.01, c1 - 0.01, 0.3);
    vec2 p2 = p * scale;
    p2.x += 2.;
    c2 = snoise(vec3(p2, time * speed + 0.25));
    c2 = smoothstep(c2 + 0.01, c2 - 0.01, 0.3);

    gl_FragColor = vec4(c1,c2,c2, 1.0);
}