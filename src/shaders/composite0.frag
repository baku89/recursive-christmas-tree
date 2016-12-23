#pragma glslify: fxaa = require(glsl-fxaa) 

uniform sampler2D tDiffuse;
uniform vec2 resolution;

varying vec2 vUv;


void main() {
  vec2 fragCoord = vUv * resolution;

  vec4 color = fxaa(tDiffuse, fragCoord, resolution);

  gl_FragColor = color;
}