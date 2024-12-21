'use client';

import Image from 'next/image';
import React, { FC, useMemo, useState } from 'react';
import { MenuItem } from './MenuItem';
import About from './About';
import { motion } from 'framer-motion';
import LanguageSelect from './LanguageSelect';

interface HomeLayoutProps {
  data?: any;
}

const CategoryList = ['all', 'breakfast', 'lunch', 'dinner', 'soup'];

export const HomeLayout: FC<HomeLayoutProps> = ({ data }) => {
  const [isShowAbout, setIsShowAbout] = useState(false);

  const allItems = useMemo(() => {
    return data?.menu?.categories.flatMap((category: any) => category.items);
  }, [data?.menu?.categories]);

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
            className="h-[33px] flex-shrink-0 rounded-full"
          />
          <h4 className="text-2xl font-medium">Menu</h4>
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
          {CategoryList.map((item) => (
            <div
              key={item}
              style={{
                boxShadow: '0px 4px 4px 0px #00000040',
              }}
              className="flex h-[34px] items-center justify-center rounded-2xl bg-white px-[17px] text-center text-base font-normal"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="px-[25px]">
        <h4 className="text-xl font-semibold text-primary underline">Lunch</h4>
      </div>

      <div className="relative mt-[71px] grid grid-cols-12 gap-3 gap-y-20 px-[25px]">
        {allItems?.map((item: any) => (
          <div key={item?.item_id} className="col-span-6 h-[180.47px] w-full">
            <MenuItem data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
