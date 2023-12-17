import Cookies from 'js-cookie'
import React from 'react'
import { useMemo } from 'react'
const WorkedHours = ({startTime,endTime}) => {
const totHours=useMemo(()=>{
    let hours = 0, totminutes = 0, minutes = 0
    for (let i = 0; i < startTime.length; i++) {
      let arr = startTime[i].split(":");
      let arr2 = endTime[i].split(":");
      hours += parseInt(arr2[0]) - parseInt(arr[0])
      var diff = parseInt(arr[1]) - parseInt(arr2[1])
      if (diff > 0) {
        totminutes -= diff;
      }
      else if (diff < 0) {
        totminutes += (diff *= -1)
      }
      while (totminutes >= 60) {
        totminutes -= 60
        hours += 1
      }
      while (totminutes <= -60) {
        totminutes += 60
        hours -= 1
      }
    }

    if (totminutes < 0) {
      hours--;
      minutes = 60 + totminutes;
    }
    else if (totminutes > 0) {
      minutes = totminutes;
    }
    let strminutes = minutes > 9 ? minutes.toString() : "0" + minutes.toString()
    return hours
},[startTime,endTime])
 
}

export default WorkedHours