uniform float time;

attribute float size;
attribute float timeOffset;
attribute float timeScale;

varying float x;

void main() {

	x = clamp(time * timeScale - timeOffset, 0., 1.);

	float y = (-(x- .25) * (x - .25) + 0.0625) * 600.0;

	vec3 pos = position * (1.0 - (1.0 - x) * (1.0 - x));
	pos.y += y;
	vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

	gl_PointSize = size * smoothstep(0., .2, x) * ( 300.0 / -mvPosition.z );

	gl_Position = projectionMatrix * mvPosition;
}