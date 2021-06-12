import React,{ useState} from 'react';
import Slide from '@material-ui/core/Slide';

export const usePersistentState = (ls_name, defaultVal = null) => {
    const [item, setItem] = useState(LS.getJSON(ls_name) || defaultVal);

    const setItemLS = (obj, updateStorage = true) => {
        setItem(obj);
        if (updateStorage) {
            let newVal = typeof obj === 'function' ? obj(item) : obj;
            LS.setJSON(ls_name, newVal);
        }
    };

    return [item, setItemLS];
}


export const LS = {
    getJSON: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        }
        catch {
            localStorage.removeItem(key);
            return null;
        }
    },
    setJSON: (key, val) => {
        localStorage.setItem(key, val ? JSON.stringify(val) : null);
    },
    get: (key) => {
        return localStorage.getItem(key);
    },
    set: (key, val) => {
        localStorage.setItem(key, val);
    },
    remove: (key) => {
        localStorage.removeItem(key);
    }
}

export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
