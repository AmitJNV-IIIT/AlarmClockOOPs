const display = document.getElementById('clock');


// set audio for alarm
var audio = new Audio("https://www.freespecialeffects.co.uk/soundfx/clocks/clock_chime.wav");
audio.loop = true;

document.getElementById('snooze-alarm').disabled =true ;

let alarmTime = null;
let alarmTimeout = null;


const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm')


const alarmList = [];  // Stores all the alarms being set 
// let count =1;


// Plays the alarm audio at correct time
function ringing(now){
    audio.play();
    document.getElementById('snooze-alarm').disabled =false;
   
}


// updates time every second 
function updateTime() {
    var today = new Date();
    const year= today.getFullYear();
    const date = today.getDate();
    let day= today.getDay();
    if(day==0){ day="sunday"};
    if(day==1){ day="monday"};
    if(day==2){ day="tuesday"};
    if(day==3){ day="wednesday"};
    if(day==4){ day="thursday"};
    if(day==5){ day="friday"};
    if(day==6){ day="saturday"};
    const month = today.getMonth();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const now = `${hour}:${minutes}:${seconds}`;
    
    display.innerText=`${hour}:${minutes}:${seconds}`;
    
//     check if the alarmList includes the current time , "now"
//     if yes, ringing() is called
    if(alarmList.includes(now) ){
        ringing(now);
    } 
}


// set the correct format of time
// converts "1:2:3" to "01:02:03"
function formatTime(time) {
    if ( time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}


// function to clear/stop the currently playing alarm
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}      


// removes an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


// removes an alarm from the array when "Delete Alarm" is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}


// Adds newAlarm to the unordered list as a new list item on webpage
function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    myList.innerHTML += html
};


// event to set a new alarm whenever the form is submitted 
addAlarm.addEventListener('submit', e=> {
    e.preventDefault();
    // const newAlarm = addAlarm.alarmTime.value;
    
    let new_h=formatTime(addAlarm.a_hour.value);
    if(new_h === '0'){
        new_h = '00'
    }
    let new_m=formatTime(addAlarm.a_min.value);
    if(new_m === '0'){
        new_m = '00'
    }
    let new_s=formatTime(addAlarm.a_sec.value);
    if(new_s === '0'){
        new_s = '00'
    }
    
    const newAlarm = `${new_h}:${new_m}:${new_s}`;

//     add newAlarm to alarmList
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    }        
})

function snooze(e){
    
    var snoozetoday = new Date();
    let snoozehour = snoozetoday.getHours();
    let snoozeminutes = snoozetoday.getMinutes();
    const snoozeseconds =snoozetoday.getSeconds()
    snoozeminutes=snoozeminutes+5;
    
    const snoozeAlarm = `${snoozehour}:${snoozeminutes}:${snoozeseconds}`;
    if(isNaN(snoozeAlarm)){
        if(!alarmList.includes(snoozeAlarm)){
            alarmList.push(snoozeAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(snoozeAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${snoozeAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    } 
}


// calls updateTime() every second
setInterval(updateTime, 1000);