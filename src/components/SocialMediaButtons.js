import React from 'react';
import VanillaTilt from 'vanilla-tilt';
import './SocialMediaButtons.css';

const SocialMediaButtons = () => {

    VanillaTilt.init(document.querySelectorAll(".sci li a"), {
        max: 30,
        speed: 400,
        glare: false
    });
    
  return (
   <ul class="sci">
    <li><a rel='noreferrer' href="https://www.youtube.com/" target='_blank'><i class="fa-brands fa-youtube"></i></a></li>
    <li><a rel='noreferrer' href="https://x.com/" target='_blank'><i class="fa-brands fa-x-twitter"></i></a></li>
    <li><a rel='noreferrer' href="https://www.whatsapp.com/" target='_blank'><i class="fa-brands fa-whatsapp"></i></a></li>
  </ul>
  );
};

export default SocialMediaButtons;
