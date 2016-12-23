varying float x;

void main() {

	vec2 uv =  gl_PointCoord;

	float r = length(uv - vec2(.5));
	float alpha = 1.0 - smoothstep(.1, .5, r);

	alpha *= smoothstep(0., 0.02, x);
	alpha *= 1.0 - smoothstep(0.8, 1.0, x);

	gl_FragColor = vec4(vec3(1.), alpha);

}