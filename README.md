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

### As a simple helper

Create a `ts-join.d.ts` file in your project with these contents:

```js
// Do not add any other lines of code to this file!
import "@zanganken/ts-join";
```

### As a dependency in your project

> For these imports to work, you'll need to ensure that, in your `tsconfig.json`, `moduleResolution` is set to `NodeNext`, `Node16` or `Bundler`.

Import `arrayJoin()` in your project and use it like this:

```js
import { arrayJoin } from "@zanganken/ts-join/array-join";

// returns "a/b/c" as a type
const something = arrayJoin(<const>["a", "b", "c"], "/")
```

or

Import `ArrayJoin<T, S>` to use it as a type in your projects:

```js
import { type ArrayJoin } from "@zanganken/ts-join/array-join";

// returns "a/b/c" as a type
type Something = ArrayJoin<readonly ["a", "b", "c"], "/">
```
