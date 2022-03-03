import React, { FC } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface TextInputProps {
    text: string;
    identifier: string;
    onFieldChange: (identifier: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage: string;
    fontSize: number;
}

const TextInput: FC<TextInputProps> = (props) => {
    const { text, identifier, onFieldChange, errorMessage, fontSize } = props;
    return (
        <div className='input-wrapper'>
            <input style={identifier === "name" ? { fontSize: `${fontSize}rem`, textAlign: "center",width:"50%  " } : { fontSize: `${fontSize}rem` }} className={errorMessage !== '' ? 'inputError' : undefined} value={text} onChange={(txt) => onFieldChange(identifier, txt)} />
        </div>
    );
}

export default TextInput;