import React from 'react'
import HeroSection from '../HeroSection'
import FilterSection from '../FilterSection'
import SearchByRequirement from '../SearchByRequirement'
import LuxuriousPropertiesSection from '../LuxuriousPropertiesSection'
import ComfortLivingSection from '../ComfortLivingSection'
import TestimonialSection from '../TestimonialSection'

const HomePage = () => {
  return (
    <div>
      <div>
        <HeroSection/>
        <FilterSection/>
        <SearchByRequirement/>
        <LuxuriousPropertiesSection/>
        <ComfortLivingSection/>
        <TestimonialSection/>
      </div>
    </div>
  )
}

export default HomePage