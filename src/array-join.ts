export type ArrayJoin<
  T extends readonly any[],
  S extends string = ","
> = T extends readonly [infer F, ...infer R]
  ? F extends symbol
    ? never
    : `${F extends string | number | bigint | boolean
        ? // else if F is string | number | bigint | boolean, return F in string
          F
        : F extends readonly any[]
        ? // else if F is an array, apply JoinType to F to squeeze its string
          ArrayJoin<F, S>
        : // done with F, we process R aka rest of T
          ""}${R["length"] extends 0
        ? // if R.length = 0, append nothing and close the string
          ""
        : // else append separator S & here we go again with JoinType<R, S>
          // until R is consumed entirely
          `${S}${ArrayJoin<R, S>}`}`
  : T extends any[]
  ? symbol extends T[number]
    ? never
    : string
  : never;

export function arrayJoin<T extends readonly any[]>(
  array: T
): ArrayJoin<T, ",">;

export function arrayJoin<T extends readonly any[], S extends string>(
  array: T,
  separator: S
): ArrayJoin<T, S>;

export function arrayJoin(array: any[], separator?: string) {
  array.join(separator);
}
