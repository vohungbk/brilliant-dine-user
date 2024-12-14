import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const languageList = [
  {
    value: 'arabic',
    title: '🇸🇦 Arabic',
  },
  {
    value: 'bengali',
    title: '🇧🇩 Bengali',
  },
  {
    value: 'english',
    title: '🇬🇧 English',
  },
  {
    value: 'french',
    title: '🇫🇷 French',
  },
];

function LanguageSelect() {
  const [isShow, setIsShow] = useState(false);
  const [selectedLang, setSelectedLang] = useState('english');

  return (
    <div>
      <Image
        src={'/icons/language.webp'}
        alt="Language"
        width={33}
        height={33}
        objectFit="cover"
        onClick={() => setIsShow(true)}
      />
      {isShow && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              style={{
                boxShadow: '-5px 4px 4px 0px #00000066',
              }}
              className="absolute right-2 top-8 z-20 h-[144px] w-[123px] rounded-[10px] border-[2px] border-primary bg-white"
            >
              {languageList.map((item) => (
                <button
                  className={cn(
                    'flex h-[35px] w-full items-center bg-transparent pl-[22px] pr-2.5',
                    {
                      'rounded-[10px] bg-[#FE5F3259]': item.value === selectedLang,
                    },
                  )}
                  key={item.value}
                  onClick={() => {
                    setSelectedLang(item.value);
                    setIsShow(false);
                  }}
                >
                  <span className="text-[11px] font-medium leading-4">{item.title}</span>
                </button>
              ))}
            </div>
          </motion.div>
          <div
            className="absolute inset-0 z-10 bg-transparent"
            onClick={() => setIsShow(false)}
          />
        </>
      )}
    </div>
  );
}

export default LanguageSelect;
