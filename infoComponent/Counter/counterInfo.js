import dataInterface from "../data-interface";

class counterInfo extends dataInterface{
    data = {};
    infoOfDays = {};

    constructor(data){
        super(data);
        Object.keys(data).map(function(index) {

            if(!(index == "treeName" || index == "userName" || index == "treeInfo"))
                this.infoOfDays[index] = data[index];
        }.bind(this)

        
    );

    this.calcSum = this.calcSum.bind(this);
    this.calcMean = this.calcMean.bind(this);

    this.data["Mean: "] = Object.keys(this.infoOfDays).length == 0 ? 0 : this.calcMean().toFixed(2);
    this.data["Sum: "] = Object.keys(this.infoOfDays).length == 0 ? 0 : this.calcSum();
    }

    calcMean(){
        return this.calcSum()/Object.keys(this.infoOfDays).length;
    }

    calcSum(){
        sum = 0;
        Object.keys(this.infoOfDays).map( function(index){
            console.log("counterInfo:29 " + JSON.stringify(this.infoOfDays)    + "    " + index);
            sum += this.infoOfDays[index];
        }.bind(this))

        return sum;
    }

}
export default counterInfo;