import React, { useEffect, useState } from 'react'
import { useTranslation, withTranslation } from 'react-i18next'


const MarqueeText = (props) => {
    const [data, setData] = useState([]);
    const { classes} = props
    const { t } = useTranslation();
    useEffect(() => {
        fetch('http://localhost:8080/api/berita') // Pastikan URL endpoint sesuai
        .then(response => response.json())
        .then(data => {
            setData([data.content]);
            console.log(data.content);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    
    return (
    <marquee direction = "left" behavior = "scroll" scrollamount="20" style={{backgroundColor: '#051d47', color: "#ffff",  display: "block" }}>
         {data.map((item, index) => (
                        <div key={index}>
                            <h2>{item[2].description}</h2>
                        </div>
                    ))} 
        </marquee>
);
}

export default MarqueeText;