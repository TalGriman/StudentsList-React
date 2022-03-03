import React, { FC } from 'react';
import Icon from "./Icon-awesome-transgender.svg";

const TransgenderIcon: FC = (props) => {

    return (
        <svg className="icons" width={12.794} height={18.284}>
            <use xlinkHref={`${Icon}#Icon_awesome-transgender`} />
        </svg>
    );
}

export default TransgenderIcon;