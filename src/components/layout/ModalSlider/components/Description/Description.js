import {useContext, useRef, useEffect} from 'react'
import PreviewContext from '../../../../../contexts/PreviewContext'
import SliderContext from '../../../../../contexts/SliderContext'
import useAnimatePrint from '../../../../../hooks/useAnimatePrint'
import clsx from 'clsx'

const Description = ({parentClassName, isDescriptionHidden}) => {

  const descriptionRef = useRef(null)

  const {previewDetails} = useContext(PreviewContext)
  const {slideDescription} = useContext(SliderContext)

  const {animatePrint} = useAnimatePrint(descriptionRef)

  const hiddenClassName = clsx({'hidden': isDescriptionHidden})

  useEffect(() => {
    if (slideDescription) {
      animatePrint(slideDescription, previewDetails.width)
    }
  }, [slideDescription, animatePrint, previewDetails.width])

  return (
    <p
      className={`${parentClassName}__description ${hiddenClassName}`}
      ref={descriptionRef}
      style={{width: previewDetails.width + 'px'}}
    ></p>
  )
}

export default Description