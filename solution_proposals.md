# CultivaTech Night Mode Contrast Solutions

## Current Issues
In night mode (Eva 001):
- Background: #1A1A1A (near black)
- Text main: #EAEAEA (light grey) with 80% opacity
- This combination has insufficient contrast for optimal readability

## Solution 1: Enhanced Text Colors
Adjust the text colors to have better contrast while maintaining the theme:

```css
[data-theme='night'] {
  --color-primary: #7B2C84; /* Purple - keep as is */
  --color-secondary: #99FF00; /* Neon Green - keep as is */
  --color-accent: #99FF00; /* Neon Green - keep as is */
  --color-background: #1A1A1A; /* Near Black - keep as is */
  --color-text-main: #FFFFFF; /* Pure white for better contrast */
  --color-text-accent: #99FF00; /* Neon Green - keep as is */
  --color-border: #555555; /* Lighter border for better visibility */
  --color-background-card: #2D2D2D; /* Slightly lighter card background */
}
```

## Solution 2: Improved Background and Text Combination
Modify both background and text colors for better visual harmony:

```css
[data-theme='night'] {
  --color-primary: #8A3A95; /* Lighter purple for better visibility */
  --color-secondary: #B3FF33; /* Brighter neon green */
  --color-accent: #B3FF33; /* Brighter neon green */
  --color-background: #222222; /* Slightly lighter background */
  --color-text-main: #F0F0F0; /* Near white text */
  --color-text-accent: #B3FF33; /* Brighter accent text */
  --color-border: #666666; /* More visible borders */
  --color-background-card: #333333; /* Card background */
}
```

## Solution 3: Targeted Fix for Paragraph Text
Keep the existing theme but specifically address the paragraph contrast issue:

In `Cultivos.jsx`, change:
```jsx
<p className="mb-6 text-text-main/80">
  Gestiona y monitorea todos tus cultivos registrados. Selecciona un cultivo para ver su estado detallado, historial de sensores y alertas específicas.
</p>
```

To:
```jsx
<p className="mb-6 text-text-main">
  Gestiona y monitorea todos tus cultivos registrados. Selecciona un cultivo para ver su estado detallado, historial de sensores y alertas específicas.
</p>
```

Or with a custom class for even better contrast:
```jsx
<p className="mb-6 text-text-main cultivo-description">
  Gestiona y monitorea todos tus cultivos registrados. Selecciona un cultivo para ver su estado detallado, historial de sensores y alertas específicas.
</p>
```

With corresponding CSS:
```css
[data-theme='night'] .cultivo-description {
  color: #FFFFFF;
  opacity: 0.9;
}
```