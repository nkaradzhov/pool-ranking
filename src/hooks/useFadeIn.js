import { useSpring } from 'react-spring'

const useFadeIn = () => {
  const styles = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { clamp: true }
  })
  return styles
}

export { animated } from 'react-spring'
export default useFadeIn
