import { useCallback, useRef, useState } from "react";

type UseLongPressOptions = {
    shouldPreventDefault?: boolean;
    delay?: number;
};

type EventType = React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>;

type UseLongPressResult = {
    onMouseDown: (event: React.MouseEvent<Element>) => void;
    onTouchStart: (event: React.TouchEvent<Element>) => void;
    onMouseUp: (event: React.MouseEvent<Element>) => void;
    onMouseLeave: (event: React.MouseEvent<Element>) => void;
    onTouchEnd: (event: React.TouchEvent<Element>) => void;
};

const useLongPress = (
    onLongPress: (event: EventType) => void,
    onClick: () => void,
    { shouldPreventDefault = true, delay = 300 }: UseLongPressOptions = {}
): UseLongPressResult => {
    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const target = useRef<EventTarget | null>(null);

    const start = useCallback(
        (event: EventType) => {
            if (shouldPreventDefault && event.target instanceof EventTarget) {
                event.target.addEventListener("touchend", preventDefault, {
                    passive: false
                });
                target.current = event.target;
            }
            timeout.current = setTimeout(() => {
                onLongPress(event);
                setLongPressTriggered(true);
            }, delay);
        },
        [onLongPress, delay, shouldPreventDefault]
    );

    const clear = useCallback(
        (_: EventType, shouldTriggerClick = true) => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            if (shouldTriggerClick && !longPressTriggered) {
                onClick();
            }
            setLongPressTriggered(false);
            if (shouldPreventDefault && target.current instanceof EventTarget) {
                target.current.removeEventListener("touchend", preventDefault);
            }
        },
        [shouldPreventDefault, onClick, longPressTriggered]
    );

    return {
        onMouseDown: (e) => start(e),
        onTouchStart: (e) => start(e),
        onMouseUp: (e) => clear(e),
        onMouseLeave: (e) => clear(e, false),
        onTouchEnd: (e) => clear(e)
    };
};

const preventDefault = (event: Event) => {
    if (event instanceof TouchEvent && event.touches.length < 2 && event.preventDefault) {
        event.preventDefault();
    }
};

export default useLongPress;