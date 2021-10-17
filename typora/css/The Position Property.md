The position CSS property sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements.

static - The element is positioned according to the normal flow of the document. The top, right, bottom, left, and z-index properties have no affect. This is the default value.

relative - The element is positioned according to the normal flow of the document, and then offset relative to itself based on the values of top, right, bottom, and left. The offset does not affect the position of any other elements, the space given for the element in the page layout is the same as if position were static.

This value creates a new stacking context when the value of z-index is not auto.

Absolute - The element is removed from the normal document flow and no space is created for the element in the page layout. It is positioned relative to its closest positioned ancestor, if any, otherwise, it is placed relative to the initial containing block (BODY). Its final position is is determined by the values of top, right, bottom, and left.