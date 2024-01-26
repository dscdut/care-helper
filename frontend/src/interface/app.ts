export interface ReactWithChild {
  children?: React.ReactNode
}

export type Dictionary<T> = Record<string, T>

export type ValidValue<T> = Exclude<T, null | undefined | 0 | '' | false>

export const BooleanFilter = <T>(x: T): x is ValidValue<T> => Boolean(x)
export type LazyLoadElement = () => Promise<{ default: React.ComponentType }>

export interface RouteLazy {
  path: string
  element: LazyLoadElement
  children?: RouteLazy[]
}
