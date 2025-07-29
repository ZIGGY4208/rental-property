import React from 'react'
import HeroSection from '../HeroSection'
import FilterSection from '../FilterSection'
import SearchByRequirement from '../SearchByRequirement'
import LuxuriousPropertiesSection from '../LuxuriousPropertiesSection'
import ComfortLivingSection from '../ComfortLivingSection'
import TestimonialSection from '../TestimonialSection'
import FeatureCards from '../FeatureCards'

const HomePage = () => {
  return (
    <div>
      <div>
        <HeroSection/>
        <FeatureCards/>
        <SearchByRequirement/>
        <LuxuriousPropertiesSection/>
        <ComfortLivingSection/>
        <TestimonialSection/>
      </div>
    </div>
  )
}

export default HomePage