import React from 'react'
import {useState,useEffect} from 'react'
import TopBar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Calendar from 'react-calendar'
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';


const GroupPage=({groupId, curr_user, setPage})=>{
    const [active, setActive] = useState(0)
    const groupSidebarList = ["Calendar", "Back"]

    const displaySubGroup = ()=>{
        if(active === 0){
            return(
                <div>Calander</div>
            )
        }
        else if (active === 1){
            setPage("MainPage")
        }
    }
    let newDate = new Date();
    const currentDate = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate();
    const schedulerData = [
        { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
        { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
    ];
    return(
        <div>  
            <div className='group-topbar-container'>
                <TopBar title = {"Placeholder Group"}/>
            </div>
            <br />
            <div className='sidebar-card-container'>
                <div className='main-sidebar-container'>
                    <Sidebar
                        list={groupSidebarList}
                        active={active}
                        setActive={setActive}
                    />
                </div>
                {displaySubGroup()}
            </div>
            <div>
            <Paper>
                <Scheduler
                data={schedulerData}
                >
                <ViewState
                    currentDate={currentDate}
                />
                <DayView
                    startDayHour={9}
                    endDayHour={14}
                />
                <Appointments />
                </Scheduler>
            </Paper>
            </div>
        </div>
    )
}
export default GroupPage