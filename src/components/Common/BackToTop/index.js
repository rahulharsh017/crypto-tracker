import React from 'react'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import './style.css'

function BackToTop() {
    let mybutton = document.getElementById("top-btn");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      mybutton.style.display = "flex";
    } else {
      mybutton.style.display = "none";
    }
}
  return (
    <div className='back-to-top'
     id='top-btn'
    onClick={() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }}>
        <ArrowUpwardRoundedIcon style={{color:'var(--blue)'}} />
    </div>
  )
}

export default BackToTop