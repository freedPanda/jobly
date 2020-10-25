import {useState} from 'react';

function useToggle(initialVal = true){
    const [value, setValue] = useState(initialVal);
    const toggle = () =>{
        setValue(isValue => !isValue);
    };

    return [value, toggle];
}

export default useToggle;