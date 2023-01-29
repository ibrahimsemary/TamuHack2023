import React from "react";

const EventCard = ({ title, startTime, endTime }) => {
    const t = "Swimming pool";
    const st = "2:30";
    const et = "4:30";
    const displayAvatars = () => {
        console.log("in display");
    };
    return (
        <div className='card-container'>
            <div className='to-center'>
                <h3 className='card-title'>{t}</h3>
            </div>
            <div className='to-center'>
                <div className='times'>
                    {st} - {et}
                </div>
            </div>

            <div className='avatar-container'>{displayAvatars()}</div>
            <div className='button-grid'>
                <div className='to-center'>
                    <div className='accept-button'>
                        <button className='ui green button accept-button'>
                            Going
                        </button>
                    </div>
                </div>
                <div>
                    <div className='reject-button'>
                        <button className='ui red button reject-button'>
                            Not Going
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
