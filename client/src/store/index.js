import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './logo-no-background.png',
    fullDecal: './logo-no-background.png',
});

export default state;