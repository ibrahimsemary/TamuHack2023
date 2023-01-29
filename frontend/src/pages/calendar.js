import {useState,useEffect} from "react"
import "../css/calendar.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputBox from "../components/InputBox";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs"
import axios from "axios";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const Calendars = ()=>{
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let timeStamp = year+"-"+month+"-"+date+" "+newDate.getHours() + ':' + newDate.getMinutes() + ":" + newDate.getSeconds();
    let initaldate = year+"-"+month+"-"+date


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [event,setEvent] = useState("");
    const [description,setDescription] = useState("")
    const [startDate,setstartDate] = useState(dayjs(initaldate))
    const [endDate,setEndDate] = useState(dayjs("2023-12-31"))
    
    
    

    

    const addEvent=async()=>{
        
        console.log(startDate)
        console.log(endDate)
        let starthour = ""
        let endhour = ""
        let startminute = ""
        let startsecond = ""
        let endminute = ""
        let endsecond = ""

        let startmonth = ""
        let endmonth = ""
        let startday = ""
        let endday = ""

        if(startDate.$M+1<10){
            startmonth = "0"+`${startDate.$M+1}`
        }else{
            startmonth = `${startDate.$M+1}`
        }

        if(endDate.$M+1<10){
            endmonth = "0"+`${endDate.$M+1}`
        }else{
            endmonth = `${endDate.$M+1}`
        }

        if(startDate.$D < 10){
            startday ="0" + `${startDate.$D}`
        }else{
            startday = `${startDate.$D}`
        }

        if(endDate.$D < 10){
            startday ="0" + `${endDate.$D}`
        }else{
            endday = `${endDate.$D}`
        }
        var intialStartDate = startDate.$y+"-"+startmonth+"-"+startday
        var initalEndDate = endDate.$y+"-"+endmonth+"-"+endday

        if(startDate.$H < 10){
            starthour = "0"+`${startDate.$H}`
        }else{
            starthour = `${startDate.$H}`
        }
        if(endDate.$H < 10){
            endhour = "0"+`${endDate.$H}`
        }else{
            endhour = `${endDate.$H}`
        }
        if(startDate.$m < 10){
            startminute = "0" + `${startDate.$m}`
        }else{
            startminute = `${startDate.$m}`
        }
        if(endDate.$m < 10){
            endminute = "0" + `${endDate.$m}`
        }else{
            endminute = `${endDate.$m}`
        }
        if(startDate.$s < 10){
            startsecond = "0" + `${startDate.$s}`
        }else{
            startsecond = `${startDate.$s}`
        }
        if(endDate.$s < 10){
            endsecond = "0" + `${endDate.$s}`
        }else{
            endsecond = `${endDate.$s}`
        }
        


        var intialStartTime = starthour+":"+startminute+":"+startsecond
        var intialEndTime = endhour+":"+endminute+":"+endsecond

        let usedStart = intialStartDate+" "+intialStartTime
        let usedEnd = initalEndDate+" "+intialEndTime

        await axios.post(
            "https://group-sync.onrender.com/add-event",
            { title:event, date: intialStartDate, start_time: intialStartTime, end_time: intialEndTime, description: description,creater:"Tim" }
        ).then(()=>{
            console.log("success")
        }).catch(function (error) {
            console.log(error);
          });
            
        
        

        
        console.log(usedStart)
        console.log(usedEnd)

        

        


    


        setEvent("")
        setstartDate(dayjs(initaldate))
        setEndDate(dayjs("2023-12-31"))
        setDescription("")

    }

    return(
        <>
        <div>
           <h1 class = "header">Your Calendar</h1>
           <div>
        <Button onClick={handleOpen} size="large">Create an Event</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
            </Typography>
            
            <div>
            <InputBox
                placeholder={"eg.Sleeping"}
                title={"Event"}
                text={event}
                setText={setEvent}
            />
            <br/>
            <br/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={startDate}
                onChange={(newValue) => {
                setstartDate(newValue);
                }}
            />
            </LocalizationProvider>
            <br/>
            <br/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date"
                    value={startDate}
                    onChange={(newValue) => {
                    setEndDate(newValue);
                    
                }}
                />
            </LocalizationProvider>
            <br/>
            <br/>
            <InputBox
                placeholder={"eg. Football"}
                title={"Description"}
                text={description}
                setText={setDescription}
            />
            <br/>
            <br/>
            
               <div className='to-center'>
                    <button className='ui black submit button' onClick = {()=>addEvent()}>
                        Submit
                    </button>
                </div>
            </div>
         
            </Box>
        </Modal>
    </div>
        </div>
           
           

           
        </>
    )
    
}
export default Calendars