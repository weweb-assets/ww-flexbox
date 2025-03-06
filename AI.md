---
name: ww-div
description: HTML div for flexible layout management. Requires display property in styles.
keywords:
  - html div
  - display
  - flex
  - grid
  - layout
---

#### ww-div

***Description***: HTML div with configurable display properties via styles key

***Specifications***:
-IMPORTANT: There is no default value for `flexDirection`, it must be set in the styles.
-IMPORTANT: Display must be defined and one of: `block`, `flex`, `grid`, `inline-block`, `inline-flex`, `inline-grid`, `none` or binding return one of the values.
-Display must always be in the styles, even when binded : {"uid":"div_1","tag":"ww-div","name":"Div 1 Name","styles":{"default":{ "display": {"wwFormula": "```variables['isDisplayed']```"}, ... }},"children":{"children":[{ ... },{ ... }]}}
-For grid column template, you can only use 2 simple formats "repeat(2,1fr)" or "1fr 1fr":
<gridTemplateColumns_examples>
    <example>
        "gridTemplateColumns":"repeat(2,1fr)"
    </example>
    <example>
        "gridTemplateColumns":"1fr 1fr"
    </example>
    <bad_example>
        "gridTemplateColumns":"repeat(auto-fill, minmax(300px, 1fr))"
        //This is wrong because this format is not supported.
    </bad_example>
</gridTemplateColumns_examples>
-To define a response `gridTemplateColumns`, you must set it in the desired breakpoints:
<gridTemplateColumns_responsive_examples>
    {"uid":"div_1","tag":"ww-div","name":"Div 1 Name","styles":{"default":{ "display": "grid", "gridTemplateColumns": "repeat(3, 1fr)", ... }, "tablet": {"gridTemplateColumns": "repeat(2, 1fr)"}, "mobile": {"gridTemplateColumns": "1fr"} },"children":{"children":[{ ... },{ ... }]}}
</gridTemplateColumns_responsive_examples>

***Children***:
  - children: Array of elements. Mandatory, must be set event if there are no children.
  - Ex: {"uid":"div_1","tag":"ww-div","name":"Div 1 Name","styles":{"default":{ "display": "...", ... }},"children":{"children":[{ ... },{ ... }]}}
  - Do not forget the "children" array in the "children" key.

***Events***: none

***Variables***: none

*** CRITICAL RULE - NO EXCEPTIONS ***: Every ww-div that uses any flex-related style property (e.g., flex: 1, align-self, order, display: flex...) **MUST** explicitly define flex-direction style property.
✅ If a ww-div has any flex-related styles, ensure its parent flex container has a clearly set flex-direction.
✅ This applies even if the ww-div itself does not set display: flex.
✅ Never assume a default flex-direction value specify it explicitly!
🔴 Missing flex-direction cause unexpected layout issues.

*** CRITICAL RULE - NO EXCEPTIONS *** : YOU MUST ALWAYS SET THE `children` KEY!
✅ Even if there are no children, you must set the `children` key with an empty array.
🔴 Missing the `children` key cause unexpected layout issues.
