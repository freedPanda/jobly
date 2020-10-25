import {useState} from 'react';

function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
  
    /**
     * used to store the value into storage
     */
    const setValue = (key,value) => {
      try {
        if(window.localStorage.getItem(key)){
            window.localStorage.removeItem(key);
        }
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
    /**
     * clear out this value from storage.
     */
    const clearValue = key =>{

        try{
            window.localStorage.removeItem(key);
            setStoredValue(false);
        }catch(error){
            console.log(error)
            return false;
        }

    }

    function getValue(){
        return storedValue;
    }
  
    return [storedValue, setValue, clearValue];
  }

  export default useLocalStorage;