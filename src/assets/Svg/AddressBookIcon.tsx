import React, { FC } from 'react';
import Icon from "./address-book.svg";

const AddressBookIcon: FC = (props) => {

    return (
        <svg className="icons" width={19.351} height={21.11}>
            <use xlinkHref={`${Icon}#address-book`} />
        </svg>
    );
}

export default AddressBookIcon;