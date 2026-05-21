# FullCalendar Resource Column Vertical Alignment Fix

## Issue
Resource column cells (headers and body) were not vertically centered, especially when rows had varying heights.

## Solution
Applied Flexbox alignment to the internal FullCalendar datagrid classes.

### CSS Changes in `style.css`:
```css
/* Vertical center resource column */
.fc-datagrid-cell-cushion,
.fc-datagrid-cell-main {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    min-height: 100%;
    height: 100%;
    padding-left: 10px !important;
}
.fc-datagrid-cell-frame {
    height: 100%;
}
```

### Key Technical Details:
1. **`.fc-datagrid-cell-cushion` & `.fc-datagrid-cell-main`**: These are the direct containers of the text/link content. Setting them to `display: flex` with `align-items: center` ensures vertical centering.
2. **`height: 100%` & `min-height: 100%`**: Forces the flex containers to occupy the full height of the parent table cell (`td`), which is critical when row heights are explicitly set (e.g., to 180px).
3. **`.fc-datagrid-cell-frame`**: The intermediate wrapper also needs `height: 100%` to pass the parent height down to the cushion.
4. **`justify-content: flex-start`**: Keeps text left-aligned as per user preference.
