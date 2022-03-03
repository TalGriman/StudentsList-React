import React, { FC } from 'react';
import Icon from "./Icon-metro-location.svg";

const MetroLocatinIcon: FC = (props) => {

    return (
        <svg className="icons" width={9.185} height={16.434}>
            <use xlinkHref={`${Icon}#Icon_metro-location`} />
        </svg>
    );
}

export default MetroLocatinIcon;