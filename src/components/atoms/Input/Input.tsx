import React, {FC, HTMLInputTypeAttribute, useEffect, useState} from 'react';
import styles from './Input.module.scss';
import Eye from '../../../assets/Icons/eye.svg';
import Cross_eye from '../../../assets/Icons/cross_eye.svg';


type InputProps = {
    label: string;
    typeInput: HTMLInputTypeAttribute | undefined;
    withIcon: boolean;
    value: string;
    onChange: (value: string) => void;
};


const Input: FC<InputProps> = ({label, typeInput, withIcon, value, onChange}) => {

    const [isVisible, setIsVisible] = useState(false);
    const [inputType, setInputType] = useState(typeInput);

    useEffect(() => {
        console.log('useEffect')
        if (typeInput === "password") {
            if (isVisible) {
                setInputType('text');
            } else {
                setInputType('password');
            }
        }
    }, [isVisible]);

    const onClickHandler = () => {
        setIsVisible((state) => !state);
    }

    return (
        <div>
            <label className={styles.textFiledLabel} htmlFor={label}>{label}</label>
            <div className={styles.inputField}>
                <input className={styles.textFiledInput}
                       type={inputType}
                       id={label}
                       value={value}
                       onChange={(event) => onChange(event.target.value)}
                />
                {
                    withIcon &&
                    <div onClick={onClickHandler} className={styles.imageEye}>
                        <img src={isVisible ? Eye : Cross_eye} alt="eye-icon"/>
                    </div>
                }
            </div>

        </div>
    );

};

export default Input;