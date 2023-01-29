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
    console.log(timeStamp)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [event,setEvent] = useState("");
    const [startDate,setstartDate] = useState(dayjs(initaldate))
    const [endDate,setEndDate] = useState(dayjs("2023-12-31"))
    
    

    

    const addEvent=()=>{

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
                placeholder={"eg. TAMU alumni network"}
                title={"Event"}
                text={event}
                setText={setEvent}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => {
                    setstartDate(newValue);
                    }}
                />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => {
                    setEndDate(newValue);
                    }}
                />
            </LocalizationProvider>
        
            
               <div className='to-center'>
                    <button className='ui black submit button'>
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