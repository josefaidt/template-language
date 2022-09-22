# template-language

```
<script context="module">
  <!-- some esm code? -->
</script>

<template lang="js">
  <!-- template code goes here with gfm syntax highlighting -->
  export const <slot name="helloExport">hello</slot> = 'world'
</template>
```

## TODO

- [ ] template parsing
- [ ] slot parsing
- [ ] slot inputs
- [ ] slot interpolation
- [x] script module parsing
- [ ] use script module for... somthing?
- [ ] port to custom rehype parser (rehype-tln?)
