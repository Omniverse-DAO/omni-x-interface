import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSwipeable } from 'react-swipeable'
import Style from '../../styles/carousel.module.scss'

const Carousel = (props: any): JSX.Element => {
  const [slideTotal, setSlideTotal] = useState(0)
  const [slideCurrent, setSlideCurrent] = useState(-1)
  const [slides, setSlides] = useState<any>([])
  const [height, setHeight] = useState('0px')
  const nextRef = useRef<HTMLDivElement>(null)
  const handlers = useSwipeable({
    onSwipedLeft: () => slideRight(),
    onSwipedRight: () => slideLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })
  useEffect(() => {
    const locSlides: any[] = []
    props.slides.forEach((slide: any) => {
      const slideobject = {
        class: `${Style.sliderSingle} ${Style.proactivede}`,
        element: slide,
      }
      locSlides.push(slideobject)
    })
    if(props.slides.length === 2){
      props.slides.forEach((slide: any) => {
        const slideobject = {
          class: `${Style.sliderSingle} ${Style.proactivede}`,
          element: slide,
        }
        locSlides.push(slideobject)
      })
    }
    setSlides(locSlides)
    setSlideTotal(locSlides.length - 1)
    setSlideCurrent(-1)
  }, [props.slides])
  useEffect(()=>{
    if(slideCurrent === -1){
      if (document.getElementsByClassName(`${Style.sliderSingle} ${Style.active}`).length > 0) {
        const height = document.getElementsByClassName(`${Style.sliderSingle} ${Style.active}`)[0].clientHeight
        setHeight(`${height  }px`)
      }
      setTimeout(() => {
        slideRight()
      }, 100)
    }
  },[slides,slideCurrent])


  const slideRight = () => {
    let preactiveSlide
    let proactiveSlide
    let slideCurrentLoc = slideCurrent

    const activeClass = `${Style.sliderSingle} ${Style.active}`
    const slide = [...slides]
    if (slideTotal > 1) {
      if (slideCurrentLoc < slideTotal) {
        slideCurrentLoc++
      } else {
        slideCurrentLoc = 0
      }
      if (slideCurrentLoc > 0) {
        preactiveSlide = slide[slideCurrentLoc - 1]
      } else {
        preactiveSlide = slide[slideTotal]
      }
      const activeSlide = slide[slideCurrentLoc]
      if (slideCurrentLoc < slideTotal) {
        proactiveSlide = slide[slideCurrentLoc + 1]
      } else {
        proactiveSlide = slide[0]
      }

      slide.forEach((slid) => {
        if (slid.class.includes(Style.preactivede)) {
          slid.class = `${Style.proactivede} ${Style.preactive}`
        }
        if (slid.class.includes(Style.preactive)) {
          slid.class = `${Style.preactivede} ${Style.preactive}`
        }
      })

      preactiveSlide.class = `${Style.sliderSingle} ${Style.preactive}`
      activeSlide.class = activeClass
      proactiveSlide.class = `${Style.sliderSingle} ${Style.proactive}`
      setSlides(slide)
      setSlideCurrent(slideCurrentLoc)

      if (document.getElementsByClassName(`${Style.sliderSingle} ${Style.active}`).length > 0) {
        setTimeout(() => {
          if (document.getElementsByClassName(`${Style.sliderSingle} ${Style.active}`).length > 0) {
            const height = document.getElementsByClassName(`${Style.sliderSingle} ${Style.active}`)[0].clientHeight
            setHeight(`${height  }px`)
          }
        }, 500)
      }
    } else if (slide[0] && slide[0].class !== activeClass) {
      slide[0].class = activeClass
      setSlides(slide)
      setSlideCurrent(0)
    }
  }
  const slideLeft = () => {
    if (slideTotal > 1) {
      let preactiveSlide
      let proactiveSlide
      let slideCurrentLoc = slideCurrent
      const slide = [...slides]
      if (slideCurrentLoc > 0) {
        slideCurrentLoc--
      } else {
        slideCurrentLoc = slideTotal
      }

      if (slideCurrentLoc < slideTotal) {
        proactiveSlide = slide[slideCurrentLoc + 1]
      } else {
        proactiveSlide = slide[0]
      }
      const activeSlide = slide[slideCurrentLoc]
      if (slideCurrentLoc > 0) {
        preactiveSlide = slide[slideCurrentLoc - 1]
      } else {
        preactiveSlide = slide[slideTotal]
      }
      slide.forEach((slid, index) => {
        if (slid.class.includes(Style.proactivede)) {
          slid.class = `${Style.sliderSingle} ${Style.preactivede}`
        }
        if (slid.class.includes(Style.proactive)) {
          slid.class = `${Style.sliderSingle} ${Style.proactivede}`
        }
      })
      preactiveSlide.class = `${Style.sliderSingle} ${Style.preactive}`
      activeSlide.class = `${Style.sliderSingle} ${Style.active}`
      proactiveSlide.class = `${Style.sliderSingle} ${Style.proactive}`
      setSlides(slide)
      setSlideCurrent(slideCurrentLoc)
      if (document.getElementsByClassName(`${Style.sliderSingle} ${Style.active}`).length > 0) {
        setTimeout(() => {
          if (document.getElementsByClassName(`${Style.sliderSingle} ${Style.active}`).length > 0) {
            const height = document.getElementsByClassName(`${Style.sliderSingle} ${Style.active}`)[0].clientHeight
            setHeight(`${height }px`)
          }
        }, 500)
      }
    }
  }

  return (
    <div className={Style.react3dCarousel} style={{ height }} {...handlers}>
      {
        slides && slides.length > 0 &&
        <div className={Style.sliderContainer} >

          <div className={Style.sliderContent}>
            {slides.map((slider: any, index: number) => (
              <div className={slider.class} key={index}>
                <div className={`${Style.sliderLeft} ${Style.sliderLeftNoborders}`} onClick={slideLeft}>
                  <div>
                    <i className="fa fa-arrow-left"></i>
                  </div>
                </div>
                <div className={`${Style.sliderRight} ${Style.sliderRightNoborders}`} onClick={slideRight} ref={nextRef}>
                  <div >
                    <i className="fa fa-arrow-right"></i>
                  </div>
                </div>

                <div className={Style.sliderSingleContent}>
                  {slider.element}
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default Carousel