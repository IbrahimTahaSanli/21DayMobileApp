class Time{
  second = 0;
  minute = 0;
  hour = 0;
    constructor(){
    }
    
    addSecond(int){
      this.second += int;
      if(this.second  >= 60){
        this.addMinute(Math.round(this.second/60));
        this.second = this.second% 60;
      }
    }
  
    addMinute(int){
      this.minute += int;
      if(this.minute  >= 60){
        this.addHour(Math.round(this.second/60));
        this.minute = this.minute% 60;
      }
    }
  
    addHour(int){
      this.hour += int;
    }
  
    toString(){
      return Math.floor(this.hour).toString().padStart(2,'0')+ ":"+ Math.floor(this.minute).toString().padStart(2,'0')+ ":" + Math.floor(this.second).toString().padStart(2,'0') ;
    }

    static calcSum(data){
        time = new Time();
    
        func = (timetmp)=>{
          timetmp = timetmp.split(":");
          time.addSecond(parseInt(timetmp[2]));
          time.addMinute(parseInt(timetmp[1]));
          time.addHour(parseInt(timetmp[0]));
        };
    
        Object.keys(data).map(function(index){
          if(!(index == "treeName" || index == "userName" || index == "treeInfo"))
            func(data[index]);
          }
        );
    
        return time.toString();
      }

      static calcMean(data){
        time = new Time();
    
        func = (timetmp)=>{
          timetmp = timetmp.split(":");
          time.addSecond(parseInt(timetmp[2]));
          time.addMinute(parseInt(timetmp[1]));
          time.addHour(parseInt(timetmp[0]));
        };
    
        Object.keys(data).map(function(index){
          if(!(index == "treeName" || index == "userName" || index == "treeInfo"))
            func(data[index]);
          }
        );

        int = ((time.hour * 60) + time.minute)*60 + time.second;
        int /= Object.keys(data).length;

        time.minute = Math.floor(int/60);
        time.second = int%60;

        time.hour = Math.floor(time.minute/60);

        time.minute = time.minute%60;

        return time.toString();
      }
  }
  export default Time;