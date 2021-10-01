Percentages - are always relative to some other value. Sometimes, it's a value from the parent and other times it's a value from the element itself.

width: 50% - half the width of the parent

line-height: 50% - half the font-size of the element itself.



EM's are relative units

With font-size, 1em equals the font-size of the parent. 2em's is twice the font size of the parent, etc.

With other properties, 1em is equal to the computed font-size of the element itself.

Padding and Margin are pretty common to use Ems with them.

Like buttons if we use ems we can keep things relative so the buttons radius says the same even when we get it bigger compared to pixels which will make the roundness less round.

ems can be bad with nested elements because that can lead to stacking the font-size making them grow or shrink very quickly.



ROOT EMS

Relative to the root html element's font-size. Often easier to work with.

If the root font-size is 20px, 1 rem is always 20px, 2rem is always 40px, etc.

