export const totHours=()=>{
    const today=new Date()
const startDate=new Date(today.getFullYear(),today.getMonth(),1,0,0,0,0)
const endDate=new Date(today.getFullYear(),today.getMonth()+1,0,23,59,59,59)
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