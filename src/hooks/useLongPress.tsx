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
    console.log('handleOnClick');
    if (isLongPress.current) {
      console.log('Is long press - not continuing.');
      return;
    }
  }

  function handleOnMouseDown(e: React.MouseEvent) {
    console.log('handleOnMouseDown');
    e.stopPropagation();
    startPressTimer();
  }

  function handleOnMouseUp(e: React.MouseEvent) {
    e.preventDefault();
    console.log('handleOnMouseUp');
    clearPressTimer();
    if (!isLongPress.current) {
      onClick(); // Trigger click action if it's not a long press
    }
    resetState();
  }

  function handleOnTouchStart(e: React.TouchEvent) {
    console.log('handleOnTouchStart');
    e.stopPropagation();
    startPressTimer();
  }

  function handleOnTouchEnd(e: React.TouchEvent) {
    e.preventDefault();
    console.log('handleOnTouchEnd');
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
