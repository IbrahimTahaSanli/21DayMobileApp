import { string } from "prop-types";
import dataInterface from "../data-interface";
import Time from "./Time";

class kronometerInfo extends dataInterface{
    data = {"Mean: ":"00:00:00","Sum: ":"00:00:00"};
    infoOfDays = {};

    constructor(data){
        super(data);
        Object.keys(data).map(function(index) {

            if(!(index == "treeName" || index == "userName" || index == "treeInfo"))
                this.infoOfDays[index] = data[index];
        }.bind(this)
    );

    this.data["Mean: "] = Object.keys(this.infoOfDays).length == 0 ? "00:00:00":Time.calcMean(this.infoOfDays);
    this.data["Sum: "] = Object.keys(this.infoOfDays).length == 0 ? "00:00:00":Time.calcSum(this.infoOfDays);
};
}
export default kronometerInfo;