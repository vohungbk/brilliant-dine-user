'use client';

import Image from 'next/image';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { MenuItem } from './MenuItem';
import About from './About';
import { motion } from 'framer-motion';
import LanguageSelect from './LanguageSelect';
import { cn } from '../lib/utils';
import { getCurrencySymbols } from '../lib/common';

interface HomeLayoutProps {
  data?: any;
}

export const HomeLayout: FC<HomeLayoutProps> = ({ data }) => {
  const [isShowAbout, setIsShowAbout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  }>({
    value: 'all',
    label: 'all',
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    const allItems = data?.menu?.categories.flatMap((category: any) => category.items);
    setItems(allItems);
  }, [data?.menu?.categories]);

  useEffect(() => {
    const itemsByCategory = data?.menu?.categories.find(
      (category: any) => category.id === selectedCategory.value,
    )?.items;

    setItems(itemsByCategory);
  }, [data?.menu?.categories, selectedCategory.value]);

  const currencySymbol = useMemo(() => {
    const currencySymbols = getCurrencySymbols();
    return currencySymbols[data?.menu?.currency] || '$';
  }, [data?.menu?.currency]);

  return (
    <div className="relative w-full rounded-[20px] bg-[#FFFAF5B2]">
      {!!isShowAbout && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.2 }}
          >
            <About restaurantInfo={data?.restaurant} />
          </motion.div>
          <div
            className="absolute inset-0 z-10 bg-[#040404A1]"
            onClick={() => setIsShowAbout(false)}
          />
        </>
      )}

      <div className="mb-8 w-full px-[25px] pt-[15px]">
        <div className="mb-8 flex items-center justify-between">
          <Image
            src={data?.restaurant?.logo || '/logo.webp'}
            alt="Logo"
            width={33}
            height={33}
            objectFit="cover"
            className="h-[33px] flex-shrink-0"
          />
          <h4 className="text-2xl font-medium">{data?.menu?.name}</h4>
          <div className="flex items-center gap-2">
            <Image
              src={'/icons/info-line.webp'}
              alt="Info"
              width={33}
              height={33}
              objectFit="cover"
              onClick={() => setIsShowAbout(true)}
            />
            <LanguageSelect />
          </div>
        </div>
        <div className="">
          <span className="text-xl font-normal leading-7">
            Your Menu,
            <br />
          </span>
          <span className="text-xl font-semibold leading-7">Digitally </span>
          <span className="text-xl font-semibold leading-7 text-[#fe5f32]">
            Delicious!
          </span>
        </div>
      </div>
      <div className="w-full pl-[25px]">
        <div className="mb-[30px] flex flex-nowrap items-center gap-2 overflow-y-auto pb-1">
          {[
            { value: 'all', label: 'all' },
            ...(data?.menu?.categories || [])?.map((cat: any) => ({
              value: cat?.id,
              label: cat?.name,
            })),
          ].map((item) => (
            <div
              key={item.value}
              style={{
                boxShadow: '0px 4px 4px 0px #00000040',
              }}
              onClick={() => setSelectedCategory(item)}
              className={cn(
                'flex h-[34px] items-center justify-center whitespace-nowrap rounded-2xl bg-white px-[17px] text-center text-base font-normal',
                {
                  'bg-[#FFD2C3] text-primary': selectedCategory.value === item.value,
                },
              )}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      {selectedCategory.label !== 'all' && (
        <div className="px-[25px]">
          <h4 className="text-xl font-semibold text-primary underline">
            {selectedCategory.label}
          </h4>
        </div>
      )}

      {selectedCategory.value === 'all' &&
        data?.menu?.categories?.map((item: any) => (
          <div key={item?.id} className="mb-4 flex flex-col gap-12">
            <div className="px-[25px]">
              <h4 className="text-xl font-semibold text-primary underline">
                {item?.name}
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-2.5 gap-y-20 px-1">
              {item?.items?.map((i: any) => (
                <div key={i?.item_id} className="h-[180.47px] w-full">
                  <MenuItem data={i} currencySymbol={currencySymbol} />
                </div>
              ))}
            </div>
          </div>
        ))}

      {selectedCategory?.value !== 'all' && (
        <div className="relative mt-[71px] grid grid-cols-12 gap-3 gap-y-20 px-1">
          {items?.map((item: any) => (
            <div key={item?.item_id} className="col-span-6 h-[180.47px] w-full">
              <MenuItem data={item} currencySymbol={currencySymbol} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
