import React from 'react';
import "./AvatarAccessoriesComponent.css";
import ReadyPlayerMeComponent from './ReadyPlayerMeComponent.js';

const AvatarAccessoriesComponent = () => {

    return(
        <div className='avatarBgDiv'>
            <div className='avatarCtrlDiv'>
                <div className="avatarBuilder">
                    <ReadyPlayerMeComponent />
                </div>
            </div>
        </div>
    ); 
};

export default AvatarAccessoriesComponent;
