# Brown Color Contrast Solutions for Night Mode

## Issue Analysis
The CultivoList.jsx component uses a placeholder image with:
- Background color: `#A77B55` (brown)
- Text color: `#F2E8CF` (cream)

In night mode, this brown color becomes difficult to see against the dark background (`#1A1A1A`).

## Solution Options

### Solution 1: Modify the brown color to be lighter in night mode
Change the brown color to a lighter variant that works better on dark backgrounds:
- Original: `#A77B55` (brown)
- Night mode: `#C99D77` (lighter brown) or `#D9B89A` (much lighter)

### Solution 2: Completely change the placeholder approach in night mode
Use a different color scheme that works better in night mode:
- Night mode background: `#4A4A4A` (dark gray)
- Night mode text: `#E0E0E0` (light gray)

### Solution 3: Add a border to the placeholder images
Add a contrasting border around placeholder images to make them more visible:
- Border color: `#555555` (medium gray)
- Border width: 1px

## Recommended Implementation
I recommend implementing Solution 1 with a CSS variable approach that automatically switches colors based on the theme:

```css
:root {
  --placeholder-bg: #A77B55;
  --placeholder-text: #F2E8CF;
}

[data-theme='night'] {
  --placeholder-bg: #C99D77;
  --placeholder-text: #1A1A1A;
}
```

Then update the placeholder image URL to use these CSS variables.