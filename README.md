# ts-join

> Global typing utility for ReadonlyArray.join to return the value of it as a type

**Without `ts-join`**:

- `join` (in `Array` and `ReadonlyArray`) returns `string`
- `join` (in `Array` and `ReadonlyArray`) doesn't react if a `symbol` is contained inside the array the method is being applied to

**With `ts-join`**:

- `arr.join(s)` returns the expected result of the `join` operation when `arr` is of type `readonly any[]` and `s` is a constant `string`
- `join` (in `Array` and `ReadonlyArray`) returns `never` if a `symbol` is contained inside the array the method is being applied to

## Install

```shell
npm install --save-dev @zanganken/ts-join
```

## Usage

Create a `ts-join.d.ts` file in your project with these contents:

```js
// Do not add any other lines of code to this file!
import "@zanganken/ts-join";
```
