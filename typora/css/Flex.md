What is Flexbox?

Flexbox is a one-dimensional layout method for laying ot items in rows or columns.

Why Flex?

Flexbox allows us to distribute space dynamically across elements of an unknown size, hence the term "flex"

Whenever you give a container a display of flex, there are two axis that you can use, Main Axis and the cross axis. By default the main axis goes from left to right, we can change that with flex-direction.

flex-direction - allows us to decide on our main axis.

row - is by default, main axis goes from left to right.

row-reverse - changes the main axis to go from right to left.

column - Our main axis goes to top to bottom.

justify-content - How the content or the elements are distrubited across the main axis.

justify-content start - will put the elements at the start of the main axis

justify-content end - with put the elements at the end of the main axis.

justify-content center - will put all the elements at the center of the main axis.

justify-content space-between - will take all the extra space and distrubt it between the elements, but not between the element and the container.

justify-content space-around - will give each element the same space around. Which is ends up with half amount of space at the start and end of the main axis.

justify-content space-evenly - will give each element evenly space around them.

flex-wrap - will determine if our elements will wrap onto a new line if its horziontal or if onto a new column if its a vertical main axis.

flex-wrap wrap - will change the cross axis to go from top to bottom

flex-wrap warp-reverse - will change the cross axis to go from bottom to top.

cross axis - by default goes from top to bottom.

align-items - will distrubt our elements across the cross axis.

align-items center - will put all the elements at the center of the cross axis.

Align-content - will distrubt elements across the cross axis, but only when we have mutiple rows or columns.

If we dont have flex-wrap turned on align-content doesn't work, it only works when flex-wrap is on wrap or wrap-reverse.

