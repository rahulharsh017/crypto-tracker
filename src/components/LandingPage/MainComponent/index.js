import React from 'react'
import Button from '../../Common/Button'
import "./style.css"
import iphone from '../../../assets/iphone.png'
import gradient from '../../../assets/gradient.png'

import {motion} from 'framer-motion'

function MainComponent() {
  return (
    <div className='flex-info'>
        <div className='left-component'>
          <motion.h1 className='track-crypto-heading'
          initial={{opacity:0,y:50}}
          animate={{opacity:1,y:0}}
          transition={{duration:1}}
          >Track Crypto</motion.h1>
          <motion.h1
          initial={{opacity:0,y:50}}
          animate={{opacity:1,y:0}}
          transition={{duration:1,delay:0.5}}
          className='real-time-heading'>Real-Time.</motion.h1>
          <motion.p
           initial={{opacity:0,y:50}}
           animate={{opacity:1,y:0}}
           transition={{duration:1,delay:0.5}}
           className='info-text'>Track crypto through a public api in real time.Visit the Dashboard to do so!</motion.p>
          <motion.div
          initial={{opacity:0,x:50}}
          animate={{opacity:1,x:0}}
          transition={{duration:1,delay:1.5}}
          className='btn-flex'>
          <Button text ={"DashBoard"} />
          <Button text = {"Share"} outlined={true}/>
          </motion.div>
        </div>
        <div className='phone-container'>
         <motion.img
          src={iphone}
           className='iphone'
           initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}/>
         <img src={gradient} className='gradient'/>
        </div>
    </div>
  )
}

export default MainComponent