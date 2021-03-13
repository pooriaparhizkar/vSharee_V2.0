import { useEffect } from 'react';

const useOnBlur = (ref: any, callback: () => void) => {
    const handleClick = (e: { target: any }) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
};

export default useOnBlur;
