import { MILLISECONDS_IN_ONE_SECOND } from "../utils/constants"

const useCounter = (initialValue, ms, fns) => {
    const [count, setCount] = useState(initialValue);
    const intervalRef = useRef(null);
    const start = useCallback(() => {
        if (intervalRef.current !== null) {
            return;
        }
        intervalRef.current = setInterval(() => {
            setCount(c => c + 1);
        }, MILLISECONDS_IN_ONE_SECOND);
    }, []);
    const stop = useCallback(() => {
        if (intervalRef.current === null) {
            return;
        }
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }, []);
    const reset = useCallback(() => {
        setCount(0);
    }, []);
    return { count, start, stop, reset };
}

