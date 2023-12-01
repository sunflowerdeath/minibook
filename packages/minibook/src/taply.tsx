import {
    useRef,
    useEffect,
    useLayoutEffect,
    useImperativeHandle,
    forwardRef,
    useState,
    useMemo,
    useCallback,
} from "react"
import { defaults } from "lodash-es"

const ENTER_KEYCODE = 13

export interface TapState {
    isHovered: boolean
    isPressed: boolean
    isFocused: boolean
}

export type TaplyRenderFn = (attrs: any, ref: any) => React.ReactElement | null

export type TaplyProps = {
    onClick?: () => void
    tapState?: TapState
    onChangeTapState?: (tapState: TapState) => void
    onFocus?: (event: FocusEvent) => void
    onBlur?: (event: FocusEvent) => void
    isDisabled?: boolean
    preventFocusOnTap?: boolean
    isFocusable?: boolean
    isPinchable?: boolean
    tabIndex?: number
}

const defaultProps = {
    isDisabled: false,
    preventFocusOnTap: true,
    isFocusable: true,
    isPinchable: false,
    tabIndex: 0,
}

interface TaplyCtx {
    isTouched: boolean
    ignoreMouse: boolean
    preventFocus: boolean
    scrollParents: HTMLElement[]
    scrollPos: ScrollPos
    mouseUpListener: ((e: MouseEvent) => void) | null
}

export const initialTapState: TapState = {
    isPressed: false,
    isHovered: false,
    isFocused: false,
}

interface ScrollPos {
    top: number
    left: number
}

const initScrollDetection = (elem: HTMLElement) => {
    const scrollPos = { top: 0, left: 0 }
    const scrollParents = []
    let node: HTMLElement | null = elem
    while (node) {
        if (
            node.scrollHeight > node.offsetHeight ||
            node.scrollWidth > node.offsetWidth
        ) {
            scrollParents.push(node)
            scrollPos.top += node.scrollTop
            scrollPos.left += node.scrollLeft
        }
        node = node.parentNode as HTMLElement | null
    }
    return { scrollParents, scrollPos }
}

// Checks if current scroll position of all scroll parents have not changed
const detectScroll = (
    elem: HTMLElement,
    scrollParents: HTMLElement[],
    scrollPos: ScrollPos
) => {
    const currentScrollPos = { top: 0, left: 0 }
    scrollParents.forEach((elem) => {
        currentScrollPos.top += elem.scrollTop
        currentScrollPos.left += elem.scrollLeft
    })
    return (
        currentScrollPos.top !== scrollPos.top ||
        currentScrollPos.left !== scrollPos.left
    )
}

const useTaply = (props: TaplyProps) => {
    const {
        onClick,
        onFocus,
        onBlur,
        isDisabled,
        preventFocusOnTap,
        isFocusable,
        tabIndex,
        onChangeTapState,
    } = defaults(props, defaultProps)

    const ctx = useRef<TaplyCtx>({
        isTouched: false,
        ignoreMouse: false,
        preventFocus: false,
        scrollParents: [],
        scrollPos: { top: 0, left: 0 },
        mouseUpListener: null,
    })

    const [tapState, setTapState] = useState(initialTapState)

    const changeTapState = (state: Partial<TapState>) => {
        setTapState((currentState) => ({ ...currentState, ...state }))
    }

    useEffect(() => {
        onChangeTapState?.(tapState)
    }, [tapState, onChangeTapState])

    const elem = useRef<HTMLElement | null>(null)

    const endTouch = useCallback(() => {
        ctx.current.isTouched = false
        changeTapState({ isHovered: false, isPressed: false })
    }, [changeTapState])

    const removeListeners = useCallback(() => {
        const listener = ctx.current.mouseUpListener
        if (listener) {
            document.removeEventListener("mouseup", listener)
            ctx.current.mouseUpListener = null
        }
    }, [])

    const onDocumentMouseUp = useCallback(
        (event: MouseEvent) => {
            removeListeners()
            // if (it.unmounted) return
            changeTapState({ isPressed: false })
        },
        [changeTapState]
    )

    const mouseEnterHandler = useCallback(
        (event: MouseEvent) => {
            if (isDisabled) return
            if (ctx.current.ignoreMouse) return
            changeTapState({ isHovered: true })
        },
        [isDisabled, changeTapState]
    )

    const mouseLeaveHandler = useCallback(
        (event: MouseEvent) => {
            if (isDisabled) return
            if (ctx.current.ignoreMouse) return
            changeTapState({ isHovered: false })
        },
        [isDisabled, changeTapState]
    )

    const mouseDownHandler = useCallback(
        (event: MouseEvent) => {
            if (isDisabled) return
            ctx.current.preventFocus = true
            setTimeout(() => {
                ctx.current.preventFocus = false
            })
            if (ctx.current.ignoreMouse) {
                ctx.current.ignoreMouse = false
                return
            }
            if (event.button !== 0) return
            ctx.current.mouseUpListener = onDocumentMouseUp
            document.addEventListener("mouseup", onDocumentMouseUp)
            changeTapState({ isPressed: true })
        },
        [isDisabled, onDocumentMouseUp, changeTapState]
    )

    const touchStartHandler = useCallback(
        (event: TouchEvent) => {
            if (isDisabled) return
            ctx.current.isTouched = true
            if (event.touches.length === 1) {
                const { scrollParents, scrollPos } = initScrollDetection(
                    elem.current!
                )
                ctx.current.scrollParents = scrollParents
                ctx.current.scrollPos = scrollPos
                changeTapState({ isHovered: true, isPressed: true })
            }
        },
        [isDisabled, changeTapState]
    )

    const touchMoveHandler = useCallback(
        (event: TouchEvent) => {
            if (isDisabled) return
            if (event.touches.length === 1) {
                const { scrollParents, scrollPos } = ctx.current
                if (detectScroll(elem.current!, scrollParents, scrollPos))
                    endTouch()
            }
        },
        [isDisabled]
    )

    const touchEndHandler = useCallback((event: TouchEvent) => {
        if (isDisabled) return
        if (event.touches.length === 0) endTouch()
    }, [])

    const focusHandler = useCallback(
        (event: FocusEvent) => {
            if (isDisabled) return
            if (!isFocusable) return
            if (ctx.current.preventFocus) {
                event.stopPropagation()
                ctx.current.preventFocus = false
            } else {
                changeTapState({ isFocused: true })
                if (onFocus) onFocus(event)
            }
        },
        [isDisabled, isFocusable, onFocus, changeTapState]
    )

    const blurHandler = useCallback(
        (event: FocusEvent) => {
            if (isDisabled) return
            changeTapState({ isFocused: false })
            if (onBlur) onBlur(event)
        },
        [isDisabled, onBlur, changeTapState]
    )

    const keyDownHandler = useCallback(
        (event: KeyboardEvent) => {
            if (isDisabled) return
            if (tapState.isFocused && event.keyCode === ENTER_KEYCODE) {
                changeTapState({ isPressed: true })
                if (onClick) onClick()
                setTimeout(() => {
                    changeTapState({ isPressed: false })
                }, 150)
            }
        },
        [isDisabled, tapState, onClick, changeTapState]
    )

    const clickHandler = useCallback(
        (event: MouseEvent) => {
            if (elem.current!.tagName === "BUTTON" && event.detail === 0) return
            if (isDisabled) return
            if (onClick) onClick()
        },
        [isDisabled, onClick]
    )

    useEffect(() => {
        if (isDisabled) {
            changeTapState(initialTapState)
            removeListeners()
            Object.assign(ctx.current, {
                preventFocus: false,
                ignoreMouse: false,
                isTouched: false,
            })
        }
    }, [isDisabled])

    const render = useCallback(
        (callback: TaplyRenderFn) => {
            const tabIndexAttr =
                isDisabled || !isFocusable ? undefined : tabIndex
            const attrs = {
                tabIndex: tabIndexAttr,
                disabled: isDisabled ? "disabled" : undefined,
                onMouseEnter: mouseEnterHandler,
                onMouseLeave: mouseLeaveHandler,
                onMouseDown: mouseDownHandler,
                onTouchStart: touchStartHandler,
                onTouchMove: touchMoveHandler,
                onTouchEnd: touchEndHandler,
                onFocus: focusHandler,
                onBlur: blurHandler,
                onKeyDown: keyDownHandler,
                onClick: clickHandler,
            }
            return callback(attrs, elem)
        },
        [
            isDisabled,
            isFocusable,
            tabIndex,
            mouseEnterHandler,
            mouseLeaveHandler,
            mouseDownHandler,
            touchStartHandler,
            touchMoveHandler,
            touchEndHandler,
            keyDownHandler,
            focusHandler,
            blurHandler,
            clickHandler,
        ]
    )

    return { tapState, render }
}

export { useTaply }
