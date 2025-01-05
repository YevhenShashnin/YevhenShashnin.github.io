'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import EmojiPicker from 'emoji-picker-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Smile } from 'lucide-react';

export function TextareaDemo() {
    const [text, setText] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    // Emojis for a quick-pick bar
    const emojis = [
        '😍',
        '😈',
        '🍆',
        '🥵',
        '💋',
        '🥰',
        '🤤',
        '💕',
        '👅',
        '😘',
        '💦',
        '😋',
        '🍓',
        '💘',
        '❤️'
    ];

    // Clicking on our quick bar emojis
    const handleQuickEmojiClick = (emoji) => {
        setText((prev) => prev + emoji);
    };

    // Clicking on an emoji in the emoji-picker
    const handleEmojiPickerClick = (emojiData, event) => {
        // emojiData.emoji gives the actual emoji character
        setText((prev) => prev + emojiData.emoji);
    };

    return (
        <div className="mx-auto mt-8 flex w-full  flex-col space-y-3">
            <Textarea
                className='resize-none text-[16px] h-[200px]'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your post here"
            />
            <div className="flex justify-between px-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            // onClick={() => setShowPicker((prev) => !prev)}
                            className="w-fit rounded-md bg-gray-200   text-sm font-medium text-black hover:bg-gray-300"
                        >
                            <Smile className='text-white'/>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="min-w-content p-0">
                        <EmojiPicker theme={'dark'} onEmojiClick={handleEmojiPickerClick}/>
                    </PopoverContent>
                </Popover>
                <div className="flex flex-wrap gap-2">
                    {emojis.map((emoji, index) => (
                        <button
                            key={index}
                            onClick={() => handleQuickEmojiClick(emoji)}
                            className="text-2xl transition-transform hover:scale-110"
                        >
                            {emoji}
                        </button>
                    ))}
                </div>


            </div>

        </div>
    );
}
