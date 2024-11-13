import React from 'react';
import Hero from './Hero';
import { useTranslation } from 'react-i18next'


const Pictures = () => {
    const { t } = useTranslation();
    const heroStyle = {
        backgroundImage: `url('./assets/images/visi-misi.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '300px',
    };

    const heroTextStyle = {
        marginTop: '-90px', // Atur margin negatif untuk menggeser lebih tinggi
    };

    return (
        <div className="each-slide-effect" style={heroStyle}>
            <Hero
                titleText={<h1 style={heroTextStyle}>{t('judul3.label')}  </h1>}
            />
        </div>
    );
}

export default Pictures;