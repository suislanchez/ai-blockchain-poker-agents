'use client';

import { useState, useEffect } from 'react';

interface FormattedThinkingProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function FormattedThinking({ text, speed = 15, className = '', onComplete }: FormattedThinkingProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  // Parse and format the thinking text
  const formatThinking = (thinking: string) => {
    const parts = thinking.split(/(\d+\.|Looking at|Community cards|Current hand strength|Would need|Pot odds|My stack|Research insight|Opponent has|They're|x402)/);
    
    return parts.map((part, i) => {
      // Key phrases get special formatting
      if (part.match(/Looking at|Community cards|Current hand strength|Pot odds|My stack|Research insight|Opponent has/)) {
        return <span key={i} className="font-bold text-yellow-300">{part}</span>;
      }
      
      // Numbers and percentages
      if (part.match(/\d+%|\d+ x402/)) {
        return <span key={i} className="font-bold text-green-300">{part}</span>;
      }
      
      // x402 token mentions
      if (part === 'x402') {
        return <span key={i} className="text-amber-300 font-semibold">x402</span>;
      }
      
      // Hand strength levels
      if (part.match(/rank \d+\/10/)) {
        return <span key={i} className="text-orange-300 font-semibold">{part}</span>;
      }
      
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className={className}>
      <div className="space-y-2 text-base leading-relaxed">
        {formatThinking(displayedText)}
        {currentIndex < text.length && <span className="animate-pulse ml-1 text-xl">▊</span>}
      </div>
    </div>
  );
}
