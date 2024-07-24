import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/web';

export const CircularLoader = () => {
  const [isComplete, setIsComplete] = useState(false);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 0) setIsComplete(false);
  }, [progress]);

  const size = 100;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const props = useSpring({
    strokeDashoffset: isComplete
      ? circumference
      : circumference - (progress / 100) * circumference,
    config: { tension: 280, friction: 60 }, // Smooth transition configuration
    onRest: () => {
      setIsComplete(true);
    },
  });

  if (isComplete) return null;

  return (
    <svg width={size} height={size} id="circular-loader">
      <circle
        stroke="#555555"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <animated.circle
        stroke="#e47f63"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        style={props}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
};
