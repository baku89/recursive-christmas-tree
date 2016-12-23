import mobile from 'is-mobile'
import { device_pixel_ratio } from 'javascript-retina-detect'

let Config = {

	CAMERA_OFFSET_Y: 0,
	CAMERA_ROT: -15 / 180 * Math.PI,

	// leaf
	LEAF_SCALE: 0.8,
	LEAF_Y: 6,
	LEAF_ROT: 30 / 180 * Math.PI,

	LEAF_OFFSET_Y: 7,


	BEAT_DURATION: 291,


	ENABLE_POSTEFFECTS: true,

	// environment
	BG: 0xf7fbfd,

	LEAF: 0x4DD694,

	STEM: 0xFC9C8D,

	FILL_LIGHT: 0x6536FF,

	HDPI: device_pixel_ratio(),
	FPS: 30,

	MOBILE: mobile()

}

Config.LEAF_SCALE_INV = 1 / Config.LEAF_SCALE
Config.FRAME_DURATION = 1000 / Config.FPS

window.Config = Config
