import React, { FC } from 'react';
import TextInput from './TextInput';

interface DetailsProps {
    text: string;
    icon: any;
    identifier: string;
    isEditMode: boolean;
    errorMessage: string;
    onFieldChange: (identifier: string, e: React.ChangeEvent<HTMLInputElement>) => void
}

const Details: FC<DetailsProps> = (props) => {

    const { icon, text, identifier, isEditMode, onFieldChange, errorMessage } = props;

    return (
        <div className='detail-container'>
            <div className='detail-icon-wrapper'>
                {icon}
            </div>
            {
                !isEditMode ?
                    <div className='detail-p-wrapper'>
                        <p>{text}</p>
                    </div>
                    :
                    <TextInput errorMessage={errorMessage} text={text} identifier={identifier} onFieldChange={onFieldChange} fontSize={1} />
            }
            {
                errorMessage !== "" &&
                <div className='detail-error-wrapper'>
                    <p>{errorMessage}</p>
                </div>
            }
        </div>
    );
}

export default Details;