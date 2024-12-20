import Image from 'next/image';
import React from 'react';

function About() {
  return (
    <div className="absolute top-0 z-20 h-[371px] w-full rounded-bl-[20px] rounded-br-[20px] bg-white px-[25px] py-[21px]">
      <div className="mb-[9px] flex justify-between">
        <Image src={'/logo.webp'} alt="Logo" width={33} height={33} objectFit="cover" />
        <h4 className="text-2xl font-medium">About</h4>
        <Image src={'/icons/si_info-line.svg'} alt="" width={33} height={33} />
      </div>
      <h4 className="font-damion text-[32px] leading-[44px] text-primary">
        Brilliant Dine
      </h4>
      <p className="mb-[9px] text-[13px] leading-[18px]">
        At Brilliant Dine, we serve a delightful fusion of flavors, crafted with the
        finest ingredients to make every meal unforgettable. Whether you&apos;re craving
        classic comfort food or bold, innovative dishes, our menu has something to satisfy
        every palate.
      </p>
      <div className="mb-2.5 flex items-center gap-[9px]">
        <Image src={'/icons/clock-outline.svg'} alt="clock" width={22} height={22} />
        <span className="text-[13px] leading-[18px]">12 PM - 10PM</span>
      </div>
      <div className="mb-2.5 flex items-center gap-[9px]">
        <Image src={'/icons/call.svg'} alt="clock" width={22} height={22} />
        <span className="text-[13px] leading-[18px]">+11 1234567</span>
      </div>
      <div className="mb-[22px] flex items-center gap-[9px]">
        <Image src={'/icons/location.svg'} alt="clock" width={22} height={22} />
        <span className="text-[13px] leading-[18px]">
          123 Culinary Avenue, Flavor Town, Food District, Gastronomy City, 56789
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Image src={'/icons/facebook.svg'} alt="facebook" width={18} height={18} />
        <Image src={'/icons/instagram.svg'} alt="instagram" width={18} height={18} />
        <Image src={'/icons/twitter.svg'} alt="twitter" width={18} height={18} />
        <span className="text-[10px] font-semibold leading-[13px] text-primary">
          /brilliantdine
        </span>
      </div>
    </div>
  );
}

export default About;
