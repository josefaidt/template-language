# template-language

```html
<!-- template.tln -->
<template lang="js">
  <!-- template code goes here with gfm syntax highlighting -->
  export const <slot name="helloExport">hello</slot> = 'world'
</template>
```

```bash
npx tln ./template.tln --helloExport=hello
```

OR

```js
import * as fs from 'node:fs'
import { EOL } from 'node:os'
import { build } from 'template-language'

const result = await build('template.tln')
fs.writeFileSync(`result.${result.extension}`, result.content, 'utf8')
```

## TODO

- [x] template parsing
- [x] slot parsing
- [x] slot inputs
- [x] slot interpolation
- [x] script module parsing
- [ ] use script module for... somthing?
- [x] ~~port to custom rehype parser (rehype-tln?)~~
- [ ] better arg handling
- [ ] cli prints to stdout? (redirectable)
- [ ] cli has argument for output file? (otherwise stdout)
- [ ] should cli arguments for slots be under `--slots comma=separated,list=null`
