// #pragma glslify: chromaticAberration = require(./chromatic-aberration)
#pragma glslify: random = require(glsl-random)
#pragma glslify: blendOverlay = require(glsl-blend/overlay)


uniform sampler2D tDiffuse;
uniform sampler2D tIce;
uniform vec2 resolution;
uniform vec2 iceOffset;

varying vec2 vUv;

const vec3 VIGNETTE_COLOR = vec3(0.14, 0.33, 0.42);
const float BLUR_MIN = 0.001;
const float BLUR_MAX = 0.01;

void main() { 

  float dist = length(vUv - vec2(.5));
  float intensity = smoothstep(.2, .7, dist);

  float rand0 = random(vUv);
  float rand1 = random(vUv + vec2(400.0));

  float blurIntensity = mix(BLUR_MIN, BLUR_MAX, intensity);
  vec3 color = 0.5 *
    (texture2D(tDiffuse, vUv + rand0 * blurIntensity).rgb +
     texture2D(tDiffuse, vUv + rand1 * blurIntensity).rgb);

  // vignette
  color = mix(color, VIGNETTE_COLOR, intensity * 0.2);

  // ice overlay
  vec3 ice = texture2D(
    tIce,
    fract(gl_FragCoord.xy / vec2(512.) + iceOffset)
  ).rgb;

  color = blendOverlay(color, ice);

  gl_FragColor = vec4(color, 1.0);
}