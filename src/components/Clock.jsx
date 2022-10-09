import React, { useEffect, useState } from "react";

function Clock() {
    let date = new Date();
    let images = ["0.jpg", "1.jpg", "2.jpg"];
    const [time, setTime] = useState(date);
    const [image, setImage] = useState("");
    let week = ["일", "월", "화", "수", "목", "금", "토"];
    let day = date.getDay();

    useEffect(() => {
        setImage(images[Math.floor(Math.random() * images.length)]);
        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div>
            <img src={`/img/${image}`} alt="Clock_main_background_image" />
            <div className="clock_container">
                <span className="date">
                    {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일 {week[day]}요일 <br />
                </span>
                <div className="time">
                    <span>{time.toLocaleTimeString("kr")}</span>
                </div>
            </div>
        </div>
    );
}

export default Clock;
