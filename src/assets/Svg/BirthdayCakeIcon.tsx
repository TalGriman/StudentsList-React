import React, { FC } from 'react';
import Icon from "./Icon-awesome-birthday-cake.svg";

const BirthdayCakeIcon: FC = (props) => {

    return (
        <svg className="icons" width={12.18} height={14.887}>
            <use xlinkHref={`${Icon}#Icon_awesome-birthday-cake`} />
        </svg>
    );
}

export default BirthdayCakeIcon;