import { useMemo } from "react"
import { flattenDeep, compact, omit } from "lodash-es"

export interface StyleProps<D extends any[] = []> {
    styles?: StyleDefinition<D>
    style?: React.CSSProperties
}
export type StyleMap = Record<string, React.CSSProperties>
export type StyleFunc<D extends any[]> = (...deps: D) => StyleMap
export type StyleDefinition<D extends any[]> =
    | undefined
    | StyleMap
    | StyleFunc<D>
    | StyleDefinition<D>[]

type FlatStyleList<D extends any[]> = (StyleMap | StyleFunc<D>)[]

const composeStyles = <D extends any[]>(
    ...stylesList: StyleDefinition<D>[]
): StyleFunc<D> => {
    return (...deps: D) => {
        const computedStyles: StyleMap = {}
        const flatStylesList: FlatStyleList<D> = compact(
            flattenDeep(stylesList as any)
        )
        for (const i in flatStylesList) {
            const styles = flatStylesList[i]
            const result =
                typeof styles === "function" ? styles(...deps) : styles
            for (const elem in result) {
                if (computedStyles[elem] === undefined)
                    computedStyles[elem] = {}
                Object.assign(computedStyles[elem], result[elem])
            }
        }
        return computedStyles
    }
}

const useStyles = <P extends StyleProps<[P, ...R]>, R extends any[] = []>(
    styles: StyleDefinition<[P, ...R]>,
    [props, ...restDeps]: [P, ...R]
): StyleMap => {
    const computeStyles = useMemo(() => {
        const items: StyleDefinition<[P, ...R]>[] = [styles, props.styles]
        if (props.style !== undefined) items.push({ root: props.style })
        return composeStyles(items)
    }, [styles, props.styles, props.style])
    return useMemo(
        () => computeStyles(props, ...restDeps),
        [props, ...restDeps]
    )
}

const omitStyleProps = <P extends {}>(props: P): Omit<P, "style" | "styles"> =>
    omit(props, ["style", "styles"]) as Omit<P, "style" | "styles">

/*
const extendComponentStyles = (Component, styles) =>
    forwardRef((props, ref) => (
        <Component
            {...props}
            ref={ref}
            styles={'styles' in props ? [styles, props.styles] : styles}
        />
    )) */

export { composeStyles, useStyles, omitStyleProps }
