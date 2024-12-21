'use client';

import Image from 'next/image';
import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface MenuItemProps {
  data?: any;
}

export const MenuItem: FC<MenuItemProps> = ({ data }) => {
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const {
    item_name,
    item_description,
    image,
    spicy_level,
    original_price,
    discounted_price,
    is_popular,
    allergens_info,
  } = data || {};

  const handleShowDetail = () => {
    setIsShowInfo(false);
    setIsShowDetail(true);
    document.body.classList.add('overflow-hidden');
  };

  const handleCloseDetail = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShowDetail(false);
    document.body.classList.remove('overflow-hidden');
  };

  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      onClick={handleShowDetail}
      className="relative flex h-full w-full items-end justify-between rounded-[29px] bg-[#222125] pb-5 pl-[19px] pr-4"
    >
      {!!isShowInfo && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.1, ease: 'easeOut' }}
          variants={variants}
          style={{ backdropFilter: 'blur(7.930069923400879px)' }}
          className="absolute inset-0 z-10 flex flex-col rounded-[29px] bg-[#18181CCC] px-[15px] pb-[18px] pt-[21px]"
        >
          <div className="mb-2.5 border-b-[0.5px] border-b-[#95959D]">
            <span className="text-[11px] font-bold text-white">{item_name}</span>
          </div>
          <div className="border-b-[0.5px] border-b-[#95959D] pb-1.5">
            <p className="text-[9px] leading-[13px] text-white">{item_description}</p>
          </div>
          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-wrap items-center gap-[2.64px]">
              {allergens_info?.split(',').map((item: string) => (
                <div
                  key={item}
                  className="flex h-4 items-center justify-center rounded-[27px] bg-primary px-[9.25px] pt-px"
                >
                  <span className="align-middle text-[6px] font-bold capitalize leading-[9px] text-black">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{ backdropFilter: 'blur(15.860139846801758px)' }}
              className="flex h-[31px] w-[31px] flex-shrink-0 items-center justify-center rounded-full bg-primary"
              onClick={(e) => {
                e.stopPropagation();
                setIsShowInfo(!isShowInfo);
              }}
            >
              <Image src={'/icons/close.svg'} alt="Close" width={9.25} height={9.25} />
            </div>
          </div>
        </motion.div>
      )}
      {!!isShowDetail && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.15, ease: 'easeOut' }}
          variants={variants}
          className="fixed bottom-0 left-0 right-0 z-50 max-h-[596px] overflow-y-scroll rounded-tl-[40px] rounded-tr-[40px] bg-[#222125] pl-[25px] pr-[23px] pt-[30px]"
        >
          <div className="flex justify-end">
            <Image
              onClick={handleCloseDetail}
              src={'/icons/x.svg'}
              alt="X"
              width={25}
              height={25}
            />
          </div>
          <h4 className="mb-[14px] text-[26px] font-semibold leading-[39px] text-primary underline">
            {item_name}
          </h4>
          <p className="font-semibold text-white">{item_description}</p>
          <div className="mb-[23px] mt-[29px] h-[1px] w-full bg-[#95959D]" />
          <div className="mb-[127px] flex flex-wrap gap-[5.71px]">
            {allergens_info?.split(',').map((item: string) => (
              <div
                key={item}
                className="flex h-[34px] items-center justify-center rounded-[59px] bg-primary px-4"
              >
                <span className="text-[13px] font-bold leading-[19px] text-black">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      <div>
        <p className="text-base font-medium text-white">{item_name}</p>
        <div className="inline-flex h-[12.29px] items-center justify-start self-stretch pr-[17.74px]">
          <div className="flex items-center">
            <span className="mr-2 text-[10px] font-medium text-white">Price </span>
            {discounted_price > 0 && (
              <div className="relative mr-1.5">
                <div
                  style={{ rotate: '-159.68deg' }}
                  className="absolute left-0 right-0 top-1/2 h-[1px] w-full bg-[#FF0000]"
                />
                <span className="text-xs font-thin leading-[18px] text-white">
                  ${original_price}
                </span>
                <div
                  style={{ rotate: '-20.3deg' }}
                  className="absolute left-0 right-0 top-1/2 h-[1px] w-full bg-[#FF0000]"
                />
              </div>
            )}

            <span className="text-xs font-medium text-primary underline">
              ${discounted_price > 0 ? discounted_price : original_price}
            </span>
          </div>
        </div>
      </div>
      <div
        className="flex h-[31px] w-[31px] flex-shrink-0 items-center justify-center rounded-[54px] bg-primary"
        onClick={(e) => {
          e.stopPropagation();
          setIsShowInfo(!isShowInfo);
        }}
      >
        <Image
          src={'/icons/info-circle.webp'}
          alt="Info circle"
          width={12.94}
          height={12.94}
        />
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
        <div className="absolute right-0 top-10 h-[45px] w-6 rounded-bl-[6px] rounded-tl-[6px] bg-[#2BA33780] shadow-popular">
          <span className="absolute -left-[6px] bottom-[17px] inline-block -rotate-90 text-[9px] font-bold leading-3 text-white">
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
  );
};
