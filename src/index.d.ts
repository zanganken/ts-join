declare namespace ReadonlyArray {
  type Join<
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
            ReadonlyArray.Join<F, S>
          : // done with F, we process R aka rest of T
            ""}${R["length"] extends 0
          ? // if R.length = 0, append nothing and close the string
            ""
          : // else append separator S & here we go again with JoinType<R, S>
            // until R is consumed entirely
            `${S}${ReadonlyArray.Join<R, S>}`}`
    : never;
}

declare namespace Array {
  // if a symbol is contained in the array, return never as a type
  type Join<T extends readonly any[]> = T extends any[]
    ? symbol extends T[number]
      ? never
      : string
    : never;
}

interface ReadonlyArray<T> {
  join(): ReadonlyArray.Join<this>;
  join<S extends string>(separator?: S): ReadonlyArray.Join<this, S>;
}

interface Array<T> {
  join(): Array.Join<this>;
  join(separator?: string): Array.Join<this>;
}
