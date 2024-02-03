/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import { ReactWithChild } from 'src/interface/app'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay } from 'swiper/modules'
import { authSlides, policiesOptions } from 'src/data/auth'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'

export default function AuthLayout({ children }: ReactWithChild) {
  return (
    <div className='grid min-h-screen grid-cols-4 overflow-hidden xl:grid-cols-5'>
      <section className='col-span-4 flex flex-col justify-between gap-10 p-6 lg:p-8 xl:col-span-2'>
        <Link to={path.home} className='w-max'>
          <h3 className='w-max pl-0 text-3xl font-semibold md:pl-8 xl:pl-0'>
            Care<span className='text-primary'>Helper</span>
          </h3>
        </Link>
        {children}
        <ul className='mx-auto flex w-full max-w-[450px] flex-wrap items-center justify-between gap-2'>
          {policiesOptions.map((policies) => (
            <li key={policies.id} className='text-sm text-[#4a5568]'>
              <Link to={policies.to}>{policies.title}</Link>
            </li>
          ))}
        </ul>
      </section>
      <section className='hidden h-full xl:col-span-3 xl:block'>
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          modules={[Autoplay]}
          className='mySwiper h-full'
        >
          {authSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img src={slide.img} alt='slide' className='h-full w-full object-cover' />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  )
}
