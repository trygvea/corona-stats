// Copied from https://gist.github.com/gragland/a32d08580b7e0604ff02cb069826ca2f
import { useRef, useState, useCallback } from 'react'

export const useHover = () => {
    const [value, setValue] = useState(false)

    // Wrap in useCallback so we can use in dependencies below
    const handleMouseOver = useCallback(() => setValue(true), [])
    const handleMouseOut = useCallback(() => setValue(false), [])

    // Keep track of the last node passed to callbackRef
    // so we can remove its event listeners.
    const ref = useRef()

    // Use a callback ref instead of useEffect so that event listeners
    // get changed in the case that the returned ref gets added to
    // a different element later. With useEffect, changes to ref.current
    // wouldn't cause a rerender and thus the effect would run again.
    const callbackRef = useCallback(
        (node) => {
            if (ref.current) {
                ref.current.removeEventListener('mouseover', handleMouseOver)
                ref.current.removeEventListener('mouseout', handleMouseOut)
            }

            if (node) {
                node.addEventListener('mouseover', handleMouseOver)
                node.addEventListener('mouseout', handleMouseOut)
            }
        },
        [handleMouseOver, handleMouseOut]
    )

    return [callbackRef, value]
}
