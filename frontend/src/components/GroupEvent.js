import React from "react";

const GroupEvent = ({ startTime, endTime, onClick, style }) => {
    return (
        <div className='to-center' onClick={onClick}>
            <div className={`event-container-group-${style}`}>
                <h4 className='to-center'>
                    {startTime} - {endTime}
                </h4>
            </div>
        </div>
    );
};

export default GroupEvent;
