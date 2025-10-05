// storiesComponents/TypingText.tsx
import React, { useEffect, useRef, useState } from "react";
import { Text } from "react-native";

interface TypingTextProps {
  text: string;
  speed?: number;
  style?: any;
  onTypingEnd?: () => void;
  restart?: boolean;
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 32,
  style,
  onTypingEnd,
  restart = false,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  // Alteração aqui: usar number em vez de NodeJS.Timeout
  const timeoutRef = useRef<number | null>(null);
  const isCompleteRef = useRef(false);

  useEffect(() => {
    if (restart) {
      setDisplayText("");
      setCurrentIndex(0);
      isCompleteRef.current = false;
    }
  }, [restart, text]);

  useEffect(() => {
    if (currentIndex >= text.length) {
      if (!isCompleteRef.current && onTypingEnd) {
        isCompleteRef.current = true;
        onTypingEnd();
      }
      return;
    }

    // No React Native, setTimeout retorna um número (ID do timer)
    const timerId = setTimeout(() => {
      setDisplayText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, speed);

    timeoutRef.current = timerId;

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, text, speed, onTypingEnd]);

  return <Text style={style}>{displayText}</Text>;
};

export default TypingText;
