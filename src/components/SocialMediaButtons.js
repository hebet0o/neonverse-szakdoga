import React from 'react';
import VanillaTilt from 'vanilla-tilt';
import './SocialMediaButtons.css';
import {useEffect} from 'react';

const SocialMediaButtons = () => {

  useEffect(() => {
    const elements = document.querySelectorAll(".sci li a");
    VanillaTilt.init(elements, {
      max: 30,
      speed: 400,
      glare: false
    });

    return () => {
      elements.forEach((el) => el.vanillaTilt.destroy());
    };
  }, []); 
    
  return (
   <ul class="sci">
    <li><a rel='noreferrer' href="https://www.youtube.com/" target='_blank'><i class="fa-brands fa-youtube"></i></a></li>
    <li><a rel='noreferrer' href="https://x.com/" target='_blank'><i class="fa-brands fa-x-twitter"></i></a></li>
    <li><a rel='noreferrer' href="https://www.whatsapp.com/" target='_blank'><i class="fa-brands fa-whatsapp"></i></a></li>
  </ul>
  );
};

export default SocialMediaButtons;
