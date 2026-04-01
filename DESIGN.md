# Design System Specification: Architectural Comfort

## 1. Overview & Creative North Star
**Creative North Star: "The Atmospheric Guardian"**

To elevate "Glamorgan Heating & Cooling" beyond a standard service provider, this design system adopts the "Atmospheric Guardian" aesthetic. We move away from the cluttered, "yellow-pages" look of traditional HVAC websites. Instead, we embrace an editorial layout that feels like a premium lifestyle magazine. 

The system breaks the rigid "box-on-box" template by utilizing **intentional asymmetry**—offsetting images and text to create movement—and **tonal depth**. We represent "Air" and "Comfort" through generous whitespace (`spacing.20`) and "Precision" through a sophisticated high-contrast typography scale. This is not just a utility; it is a curated environment of reliability.

---

## 2. Colors & Surface Philosophy
Our palette moves from the deep reliability of the Atlantic to the warmth of a hearth.

### The "No-Line" Rule
**Strict Mandate:** 1px solid borders are prohibited for sectioning. Contrast and containment must be achieved through:
1.  **Background Color Shifts:** Moving from `surface` (#f8f9fa) to `surface-container-low` (#f3f4f5).
2.  **Tonal Transitions:** Using the `surface-container` tiers to define functional zones.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials. 
*   **Base Level:** `surface` (#f8f9fa) for the overall page background.
*   **Section Level:** `surface-container-low` (#f3f4f5) for large content blocks (e.g., "Our Services").
*   **Object Level:** `surface-container-lowest` (#ffffff) for cards or interactive elements to create a "lifted" feel without heavy shadows.

### The "Glass & Gradient" Rule
To evoke the feeling of clean, filtered air, use **Glassmorphism** for floating navigation bars or contact overlays:
*   **Fill:** `surface_variant` at 70% opacity.
*   **Effect:** `backdrop-filter: blur(12px)`.
*   **Signature Texture:** Use a subtle linear gradient on primary CTAs: `primary` (#001e40) to `primary_container` (#003366) at a 135° angle. This adds a "weighted" professional polish that feels more premium than flat fills.

---

## 3. Typography
We use a high-contrast pairing to balance authority with accessibility.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision and modern "tech" feel. Use `display-lg` (3.5rem) for Hero statements to command the space.
*   **Body & Labels (Inter):** A workhorse for readability. Inter’s tall x-height ensures that even technical HVAC specifications are legible on mobile devices.
*   **The Tonal Voice:** Headlines should always use `on_surface` (#191c1d) for maximum authority, while secondary descriptions use `on_surface_variant` (#43474f) to reduce visual noise.

---

## 4. Elevation & Depth
In this system, depth is felt, not seen.

### The Layering Principle
Achieve hierarchy by stacking the `surface-container` tokens. An information card (`surface-container-lowest`) placed upon a section background (`surface-container-low`) creates a natural, soft separation that feels architectural and intentional.

### Ambient Shadows
Where floating elements are required (e.g., a "Schedule Now" fab):
*   **Shadow Color:** A 6% opacity tint of `on_surface` (#191c1d).
*   **Blur:** 32px to 64px (extra-diffused).
*   **Offset:** Y: 8px. 
Avoid dark grey "drop shadows" which feel dated and heavy.

### The "Ghost Border" Fallback
If a visual boundary is required for accessibility:
*   **Token:** `outline_variant` (#c3c6d1).
*   **Opacity:** Reduce to 15% opacity. It should be a suggestion of a line, not a hard barrier.

---

## 5. Components

### Buttons (The "Call-to-Action" Engine)
*   **Primary (High-Conversion):** `secondary_container` (#fcd400) with `on_secondary_container` (#6e5c00) text. Use `rounded.md` (0.75rem).
*   **Secondary (Inquiry):** `primary` (#001e40) fill with `on_primary` (#ffffff) text.
*   **Tertiary:** Ghost style—no fill, `primary` text, with a `surface-container-highest` background on hover.

### Cards & Service Lists
*   **Constraint:** Zero dividers. Use `spacing.6` (2rem) of vertical whitespace to separate items.
*   **Style:** Use `rounded.lg` (1rem) for all service cards. Background should be `surface-container-lowest` (#ffffff).

### Input Fields
*   **Resting State:** `surface-container-high` background with no border.
*   **Focus State:** A 2px "Ghost Border" using `surface_tint` (#3a5f94) and a soft ambient glow.
*   **Shape:** `rounded.sm` (0.25rem) to suggest precision and technical accuracy.

### Atmospheric Status Chips
Use for "Emergency Service Available" or "Certified Technician":
*   **Style:** `primary_fixed` background with `on_primary_fixed` text. This low-contrast, high-tone combination feels premium and calm.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts. For example, a headline at `spacing.8` left-padding, while the supporting image is flush to the right edge.
*   **Do** use the `spacing.20` (7rem) token for section padding to allow the brand to "breathe."
*   **Do** use `secondary` (#705d00) for small accents like icons or bullet points to draw the eye without overwhelming.

### Don’t:
*   **Don’t** use pure black (#000000) for text. Use `on_surface` (#191c1d) to maintain the premium, editorial feel.
*   **Don’t** use 100% opaque borders. They create "visual friction" that contradicts the feeling of flowing air.
*   **Don’t** crowd the "Schedule" button. It must always be surrounded by at least `spacing.5` of clear space.