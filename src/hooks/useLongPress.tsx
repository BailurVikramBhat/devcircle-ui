import { useRef } from 'react';

const useLongPress = (onClick: () => void, onLongPress: () => void) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const isLongPress = useRef<boolean>(false);

  function startPressTimer() {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      onLongPress();
    }, 500);
  }

  const clearPressTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  function resetState() {
    isLongPress.current = false;
  }

  function handleOnClick() {
    if (isLongPress.current) {
      return;
    }
  }

  function handleOnMouseDown() {
    startPressTimer();
  }

  function handleOnMouseUp() {
    clearPressTimer();
    if (!isLongPress.current) {
      onClick(); // Trigger click action if it's not a long press
    }
    resetState();
  }

  function handleOnTouchStart() {
    startPressTimer();
  }

  function handleOnTouchEnd() {
    clearPressTimer();
    if (!isLongPress.current) {
      onClick(); // Trigger click action if it's not a long press
    }
    resetState();
  }

  return {
    handlers: {
      onClick: handleOnClick,
      onMouseDown: handleOnMouseDown,
      onMouseUp: handleOnMouseUp,
      onTouchStart: handleOnTouchStart,
      onTouchEnd: handleOnTouchEnd,
    },
  };
};

export default useLongPress;
