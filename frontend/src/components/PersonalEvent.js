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


const PersonalEvent = ({username})=>{
    const [events, setEvents] = useState([])
    const getData = async () => {
        const res = await axios.get(
            `https://group-sync.onrender.com/event/${username}`
        );
        console.log(res);
        setEvents(res.data);
    };
    useEffect(() => {
        getData();
    }, []);
    
    for(var i = 0; i < events.length;++i){
        for(var j = 0; j < events[i].length;++i){

        }
    }
    const display =()=>{
        for(var i = 0; i < events.length;++i){
            for(var j = 0; j < events[i].length;++i){
                
            }
        }
    }

    return(
        <div key>Howdy</div>
    )
}