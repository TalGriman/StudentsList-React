import React, { FC } from 'react';
import Icon from "./graduation-hat.svg";

const GraduationHatIconV1: FC = (props) => {

    return (
        <svg className="icons" width={21} height={18} >
            <use xlinkHref={`${Icon}#Path_1`} />
        </svg>
    );
}


export { GraduationHatIconV1 };