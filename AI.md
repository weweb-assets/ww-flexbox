---
name: ww-flexbox
description: HTML div for flexible layout management. Requires display property in styles.
keywords:
  - html div
  - display
  - flex
  - grid
  - layout
---

#### ww-flexbox

***Description***: HTML div with configurable display properties via styles key

***Specifications***:
-IMPORTANT: The `display` style is mandatory in the styles.
-For grid column template, you can only use 2 simple formats "repeat(2,1fr)" or "1fr 1fr". Ex: repeat(auto-fill,minmax(300px,1fr)) is totally forbidden.
-Display must be one of: `block`, `flex`, `grid`, `inline-block`, `inline-flex`, `inline-grid`, `none`

***Children***:
  - children: Array of elements
  - Ex: {"uid":"flexbox_1","tag":"ww-flexbox","name":"Flexbox 1 Name","styles":{"default":{ ... }},"children":{"children":[{ ... },{ ... }]}}
  - Do not forget the "children" array in the "children" key.

***Events***: none

***Variables***: none
