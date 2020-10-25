import {useState} from 'react';

function useSetVal(init = ""){
    const [value, setValue] = useState(init);
    const setVal = value =>{
        setValue(value);
    }

    return [value,setVal];
}

export default useSetVal;