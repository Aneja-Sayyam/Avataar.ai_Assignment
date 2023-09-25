import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"

interface Props{
    images:string[]
}
export const Carousel = ({images}:Props) => {
    const [selectedImage,setSelectedImage] = useState(2)

    function getImage(position:number):string{
      const relativeIndex = selectedImage+position
      if(relativeIndex<0){
        return images[images.length+relativeIndex]
      }
      return images[(selectedImage+position)%images.length]
    }

    

    useEffect(()=>{
      function handleKeydown(event:KeyboardEvent){
        const {key} = event
        if(key==="ArrowRight"){
          setSelectedImage((prev)=>{
            return (prev+1)%images.length
          })
        }else if(key==="ArrowLeft"){
          setSelectedImage((prev)=>{
            const relativeIndex = prev - 1
            return relativeIndex<0?images.length+relativeIndex:relativeIndex
          })
        }
      }
      window.addEventListener("keydown",handleKeydown)
      return ()=>{
        window.removeEventListener("keydown",handleKeydown)
      }
    })
    
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Featured Products</h1>
        <p>Explore and discover a variety of products</p>
      </header>
      <div className={styles.carousel}>
        <img className={styles.Image1} src={getImage(-2)} alt="" />
        <img className={styles.Image2} src={getImage(-1)} alt="" />
        <img className={styles.Image3} src={getImage(0)} alt="" />
        <img className={styles.Image4} src={getImage(1)} alt="" />
        <img className={styles.Image5} src={getImage(2)} alt="" />
      </div>
      <div className={styles.slideIndicator}>
        <img src="arrow_left.svg" alt="" />
        {images.map((link,index)=>{
          if(index===selectedImage){
            return <img src="selected_indicator.svg" alt="" />
          }
          return <img src="dot_indicator.svg" alt="" />
        })}
        <img src="arrow_right.svg" alt="" />
      </div>
    </div>
  )
}
