import React, { useEffect, useState } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArchiveIcon from '@material-ui/icons/Archive';

const BottomNavigationTab = ({ classes }) => {
    const [scrollBottom, setScrollBottom] = useState(false)
    useEffect(() => {
        window.onscroll = function (ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                setScrollBottom(true)
            } else {
                setScrollBottom(false)
            }
        };
    }, [])
    return (
        <BottomNavigation
            showLabels
            // style={{
            //     position: 'fixed',
            //     display: `${scrollBottom === true ? 'none' : 'flex'}`,
            //     bottom: 0,
            //     width: '100%',
            //     height: 80,
            //     backgroundColor: '#0f2c56',
            //     color: '#fff',
            //     justifyContent: 'space-between'
            // }}
        >
            {/* <BottomNavigationAction style={{ color: '#fff' }} label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction style={{ color: '#fff' }} label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction style={{ color: '#fff' }} label="Archive" icon={<ArchiveIcon />} />
            <BottomNavigationAction style={{ color: '#fff' }} label="Archive" icon={<ArchiveIcon />} />
            <BottomNavigationAction style={{ color: '#fff' }} label="Archive" icon={<ArchiveIcon />} /> */}
        </BottomNavigation>
    )
}

export default BottomNavigationTab