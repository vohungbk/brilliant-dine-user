'use client';

import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { ItemDetail } from './ItemDetail';
import { parseCookies } from 'nookies';
import { COOKIE_NAME } from './LanguageSelect';

interface MenuItemProps {
  data?: any;
  currencySymbol: string;
}

export const MenuItem: FC<MenuItemProps> = ({ data, currencySymbol }) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const {
    item_name,
    item_description,
    image,
    spicy_level,
    original_price,
    discounted_price,
    is_popular,
    allergens_info,
    dietary_info,
    nutri_info,
  } = data || {};

  useEffect(() => {
    const cookies = parseCookies();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split('/');
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }
    if (languageValue) {
      setSelectedLang(languageValue);
    }
  }, []);

  const handleShowDetail = () => {
    setIsShowDetail(true);
    document.body.classList.add('overflow-hidden');
  };

  const handleCloseDetail = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShowDetail(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <>
      <div
        onClick={handleShowDetail}
        className="relative flex h-full w-full items-end justify-between rounded-[29px] bg-[#222125] pb-5 pl-2.5 pr-3"
      >
        <div>
          <div className="truncate-2-lines max-w-[150px] text-base font-medium text-white">
            {item_name}
          </div>
          <div className="inline-flex h-[12.29px] items-center justify-start self-stretch">
            <div className="flex items-center">
              <span className="mr-2 text-[10px] font-medium text-white">Price </span>
              {discounted_price > 0 && (
                <div className="relative mr-1.5">
                  <div
                    style={{ rotate: '-159.68deg' }}
                    className="absolute left-0 right-0 top-1/2 h-[1px] w-full bg-[#FF0000]"
                  />
                  <span className="text-xs font-thin leading-[18px] text-white">
                    {currencySymbol}
                    {original_price}
                  </span>
                  <div
                    style={{ rotate: '-20.3deg' }}
                    className="absolute left-0 right-0 top-1/2 h-[1px] w-full bg-[#FF0000]"
                  />
                </div>
              )}

              <span className="text-xs font-medium text-primary underline">
                {currencySymbol}
                {discounted_price > 0 ? discounted_price : original_price}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute -top-[47px] left-0 flex h-[135px] w-[135px] items-center justify-center rounded-full bg-white">
          <Image
            className="size-[113px] rounded-full"
            src={image || '/images/img.png'}
            alt=""
            width={113}
            height={113}
          />
        </div>
        {is_popular && (
          <div
            className={cn(
              'absolute right-0 top-10 h-[45px] w-6 rounded-bl-[6px] rounded-tl-[6px] bg-[#2BA33780] shadow-popular',
              {
                'top-3 h-[80px]':
                  ['fr', 'es', 'de', 'it', 'hi', 'tr'].includes(selectedLang) ||
                  selectedLang == 'ja',
              },
            )}
          >
            <span
              className={cn(
                'absolute -left-[6px] bottom-[17px] inline-block -rotate-90 text-[9px] font-bold leading-3 text-white',
                {
                  '-right-[10px]': ['fr', 'es', 'de', 'it', 'hi', 'tr'].includes(
                    selectedLang,
                  ),
                  'bottom-0 left-1.5 rotate-0': selectedLang == 'ja',
                  'left-0': selectedLang == 'ar',
                },
              )}
            >
              Popular
            </span>
          </div>
        )}
        <div
          className={cn(
            'absolute bottom-[68px] right-0 flex h-[19px] w-6 items-center justify-center rounded-bl-md rounded-tl-md',
            { 'bg-[#2BA33780]': spicy_level === 'low' },
            { 'bg-[#FFFF0080]': spicy_level === 'medium' },
            { 'bg-[#FF000080]': spicy_level === 'high' },
          )}
        >
          <Image src={'/icons/spicy.png'} alt="Info circle" width={11} height={14} />
        </div>
      </div>
      {!!isShowDetail && (
        <ItemDetail
          itemName={item_name}
          itemDescription={item_description}
          allergensInfo={allergens_info}
          dietaryInfo={dietary_info}
          nutriInfo={nutri_info}
          handleCloseDetail={handleCloseDetail}
          image={image}
          spicyLevel={spicy_level}
        />
      )}
    </>
  );
};
