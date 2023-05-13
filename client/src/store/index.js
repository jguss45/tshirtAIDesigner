import { proxy } from "valtio";

//state object is used to store the following information and subsequently trigger re-renders on a change to any of its keys
const state = proxy({
    intro: true, //changing from home page to customizer
    color: '#EFBD48', //changing color
    isLogoTexture: true, //showing image as logo
    isFullTexture: false, //showing image as full shirt texture
    logoDecal: './logo-no-background.png', //change to logo
    fullDecal: './logo-no-background.png', //change to full texture
});

export default state;