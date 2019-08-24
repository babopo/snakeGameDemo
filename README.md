### Usage

#### Load snake.js: 

<script src="snake.js"></script>

#### Create:

``` js
var obj = new snake(width, height)
//using custom width & height
obj.generateHead()
//generate a random head position and random initial direction
obj.generateApple()
//generate a random Apple position 
```

What you should do next is adding event listener to listen keyboard events by binding functions below to change moving direction

``` js
obj.turnUp()
obj.turnDown()
obj.turnLeft()
obj.turnRight()
```

The property `obj.map` stores current state of the game, using `obj.next()` to get the next state.

When the game fails , it will throw an error, using `try - catch` to deal with it.

### Demos 

- there is a simple string edition of this demo, using arrows to control directions.

