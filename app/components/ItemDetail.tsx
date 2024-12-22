import React, { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ItemDetailProps {
  handleCloseDetail: (e: any) => void;
  itemName: string;
  itemDescription: string;
  allergensInfo: string;
  image: string;
}

const variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const ItemDetail: FC<ItemDetailProps> = ({
  handleCloseDetail,
  itemName,
  itemDescription,
  image,
  allergensInfo,
}) => {
  return (
    <div className="fixed inset-0 z-50 h-screen">
      <div className="absolute bottom-[350px] left-1/2 z-10 flex size-[309px] -translate-x-1/2 items-center justify-center rounded-full bg-white">
        <Image
          src={image || '/images/img.png'}
          alt="Image detail"
          className="size-[250px] rounded-full"
          width={250}
          height={250}
        />
      </div>
      <div className="absolute inset-0 bg-[#18181CCC]" onClick={handleCloseDetail} />
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.15, ease: 'easeOut' }}
        variants={variants}
        className="absolute bottom-0 left-0 right-0 z-50 max-h-[596px] rounded-tl-[40px] rounded-tr-[40px] bg-[#222125] pl-[25px] pr-[23px] pt-[30px]"
      >
        <div className="z-50 h-[500px] overflow-y-scroll">
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
            {itemName}
          </h4>
          <p className="font-semibold text-white">{itemDescription}</p>
          <div className="mb-[23px] mt-[29px] h-[1px] w-full bg-[#95959D]" />
          <div className="mb-[127px] flex flex-wrap gap-[5.71px]">
            {allergensInfo?.split(',').map((item: string) => (
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
        </div>
      </motion.div>
    </div>
  );
};