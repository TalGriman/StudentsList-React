import React, { FC } from 'react';
import Icon from "./envelope.svg";

const EnvelopeIcon: FC = (props) => {

    return (
        <svg className="icons" width={21.11} height={19.351}>
            <use xlinkHref={`${Icon}#envelope`} />
        </svg>
    );
}

export default EnvelopeIcon;