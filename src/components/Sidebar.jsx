import React from 'react';
import Navbar from './Navbar'
import Search from './Search';
import Chats from './Chats';
const Sidebar = () => {
    return (
        <div className='w-2/5 bg-purple-800 rounded-l-lg overflow-hidden'>
            <Navbar/>
            <Search/>
            <Chats/>
        </div>
    );
};

export default Sidebar;