// #pragma glslify: chromaticAberration = require(./chromatic-aberration)
#pragma glslify: random = require(glsl-random)

uniform sampler2D tDiffuse;
varying vec2 vUv;

const vec3 VIGNETTE_COLOR = vec3(0.14, 0.33, 0.42);
const float BLUR_INTENSITY = 0.01;

void main() { 

  float dist = length(vUv - vec2(.5));
  float intensity = smoothstep(.2, .7, dist);

  float rand0 = random(vUv);
  float rand1 = random(vUv + vec2(400.0));

  vec3 color = 0.5 *
    (texture2D(tDiffuse, vUv + rand0 * BLUR_INTENSITY * intensity).rgb +
      texture2D(tDiffuse, vUv + rand1 * BLUR_INTENSITY * intensity).rgb);

  // vignette

  color = mix(color, VIGNETTE_COLOR, intensity * 0.2);



  gl_FragColor = vec4(color, 1.0);
}