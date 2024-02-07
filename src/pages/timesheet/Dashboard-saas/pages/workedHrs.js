const workedHrs = (stime, etime) => {
    let start = stime.split(":")
    let end = etime.split(':')
    let hrs = end[0] - start[0]
    let min = Math.abs(end[1] - start[1])
    if(min==60){
        hrs+=1;
        min=0;
        return hrs+"."+min
    }
    return hrs + "." + min
  }
  export default workedHrs