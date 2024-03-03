import { useStateContext } from "Context/ContextProvider"
export const totHours=()=>{
  const {startdate,enddate} = useStateContext()
    const today=new Date()
    console.log(startdate)
const startDate=new Date(new Date(startdate).getFullYear(),new Date(startdate).getMonth(),1,0,0,0,0)
const endDate=new Date(new Date(startdate).getFullYear(),new Date(startdate).getMonth()+1,0,23,59,59,59)
let count=0;
while(startDate<=endDate){
  const Day=startDate.getDay()
  if(Day!==5 && Day!==6){
  count++;
  }
  startDate.setDate(startDate.getDate()+1);
}
const totalHours=count*8; 
return totalHours
}