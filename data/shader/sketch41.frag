//https://github.com/keijiro/ShaderSketches/blob/master/Fragment/Circles.glsl
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
//#define PI 3.14159265358979323846


// Description : Array and textureless GLSL 2D/3D/4D simplex noise functions.//      Author : Ian McEwan, Ashima Arts.//  Maintainer : ijm//     Lastmod : 20110822 (ijm)//     License : Copyright (C) 2011 Ashima Arts. All rights reserved. Distributed under the MIT License. See LICENSE file.//               https://github.com/ashima/webgl-noise
vec3 mod289(vec3 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 permute(vec4 x) {return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
////////////////////////////////////////////////////////////////////////
vec2 rotate(vec2 v, float a) {float s = sin(a);float c = cos(a);mat2 m = mat2(c, -s, s, c);return m * v;}
float rand(vec2 co){return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}

float circle(vec2 coord)
{
    float reso = 12.0;
    float cw = resolution.x / reso;

    vec2 p = mod(coord, cw);
    float d = distance(p, vec2(cw / 2.0));

    vec2 p2 = floor(coord / cw);
    vec2 gr = vec2(0.443, 0.312);
    float t = time * 2.0 + dot(p2, gr);

    float l = cw * 6. * snoise(vec3(time + 1.5,p2+time/20. +11420.5));
    float lw = 10.;
    return max(0.0, 1.5 - abs(l - d) / lw);
}

void main()
{
    float c1 = 0.0;
    float c2 = 0.0;
    
    c1 += circle(gl_FragCoord.xy * 1.0);
    c2 += circle(gl_FragCoord.xy * 2.0);
    c1 += c1/2.;
    c2 += c2/2.;
    c2 = min(1.0, c2);
    gl_FragColor = vec4(min(1.0, c1),c2,c2, 1);
}
