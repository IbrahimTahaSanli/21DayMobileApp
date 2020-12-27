import {Dimensions } from"react-native";

const responsive_font_size = class {
    scale = 0.0013;
    getScale(){return this.scale;};
    setScale(float){this.scale=float;};

    constructor(scale){
        this.scale = scale;
        this.ViaWidth=this.ViaWidth.bind(this);
    };

    ViaWidth(size){
        return Math.round(Dimensions.get("screen").width * Dimensions.get("screen").scale) * this.scale * size;
    };

    static ViaWidth(size ,scale){
        return Math.round(Dimensions.get("window").width*Dimensions.get("screen").scale) * scale * size;
    };
}
export default responsive_font_size;
