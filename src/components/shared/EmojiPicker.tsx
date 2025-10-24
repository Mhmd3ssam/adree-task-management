"use client"

import React, { useState, useRef, useEffect } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  currentEmoji?: string
}

export default function EmojiPicker({ onEmojiSelect, currentEmoji = "📋" }: EmojiPickerProps) {
  const [showPicker, setShowPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block" ref={pickerRef}>
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="text-2xl hover:bg-[var(--surface)] rounded p-1 transition-colors"
      >
        {currentEmoji}
      </button>
      
      {showPicker && (
        <div className="absolute z-50 top-full left-0 mt-1">
          <Picker
            data={data}
            onEmojiSelect={(emoji: any) => {
              onEmojiSelect(emoji.native)
              setShowPicker(false)
            }}
            theme="light"
          />
        </div>
      )}
    </div>
  )
}
