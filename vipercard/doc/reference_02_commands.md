<!---
this is a generated file, changes will be lost.
-->

[Overview](./reference_01_overview.md) | Commands | [Syntax](./reference_03_syntax.md) | [Properties](./reference_04_properties.md) | [Functions](./reference_05_functions.md) | [Event Handlers](./reference_06_events.md) | [Compatibility](./reference_07_compatibility.md)



## add


Adds the value of number to the number in a container.

Examples:

```


put 2 into x
add 3 to x
answer x -- will display "5"

put "1,2,3" into x
add 3 to item 2 of x
answer x -- will display "1,5,3"

add 5 to cd fld "myFld"


```



## answer


Displays a dialog box.

The button that is pressed (1, 2, or 3) will be assigned to the variable "it".

Examples:

```


answer "abc" -- will display "abc"

answer "are you sure?" with "OK" or "cancel" 
put it into whichChosen
if whichChosen is 1 then
answer "clicked OK"
else if whichChosen is 2 then
answer "clicked cancel"
end if

answer "many choices" with "btn1" or "btn2"  or "btn3" 
answer whichChosen



```



## ask


Displays a dialog box allowing the user to type in a response.

The text typed will be assigned to the variable `it`. If the user clicks `Cancel`, the result will be `""`.

You can say `ask "prompt"` or `ask "prompt" with "default text"`.

Examples:

```


ask "what is your name?" with "ben"
put it into yourName
if yourName is "" then
    answer "you did not type a name"
else
    answer "you typed" && yourName
end if


```



## beep



Play the system beep sound.


## choose tool



You can use the choose command to programmatically draw shapes and lines.

When a script completes, you'll be taken back to the Browse tool regardless of which tool was chosen within a script.

The form `choose "brush" tool` and `choose tool 3` is also supported.

Examples:

```


choose pencil tool
click at 10,20
-- this draws a black pixel at the coordinates x=10, y=20

choose line tool
drag from 10,20 to 30,40
-- this draws a line starting at the coordinates (10,20) 
-- ending at (30,40)

-- tools include:
brush
bucket
pencil
line
rect
oval
roundrect
curve
spray
browse


```



## click


Use the click command for programmatically drawing pictures. Remember to first use the choose command to indicate what to draw.

Examples:

```


choose pencil tool
click at 10,20
-- this draws a pixel at the coordinates x=10, y=20



```



## create


Use `domenu "new button"` or `domenu "new field"` to create a button.

Examples:

```


doMenu "New Button"
put the result into newBtn
set the name of cd btn id newBtn to "my new button"
set the loc of cd btn id newBtn to 30, 30


```



## do


Take a string, and execute it as if it were a ViperCard script.

Similar to eval() in other languages.

Examples:

```


put "answer " into buildScript
put quote & "abc" & quote after buildScript
do buildScript


```



## doMenu


Do a menu action.

Supported actions include:


```

doMenu "new card"
doMenu "delete card"
doMenu "first"
doMenu "prev"
doMenu "next"
doMenu "last"
doMenu "new button"
doMenu "new field"
doMenu "duplicate card paint"

-- all items from the Draw menu like
doMenu "black fill"
-- all items from the Font menu like
doMenu "helvetica"
-- all items from the Style menu like
doMenu "14"


```



## dial


The dial command generates touch-tone sounds for the digits in the number, through the speaker. To dial the phone from ViperCard, you must either hold the handset up to the speaker of your computer or use a device that feeds computer audio output to the telephone.

Note: If you include a hypen in the number, place the entire expression in quotation marks. Otherwise, ViperCard performs a subtraction before dialing the number.

The first time the `dial` command is run, the sounds might not be played because they might not have been loaded yet. Use `dial "" ` when your program starts to ensure that the sounds are loaded.

Examples:

```


dial "" -- begin loading the dial tone sounds
wait 4 seconds
dial "555-1234"


```



## disable


Disables a button (sets the "enabled" property to true, so that the button no longer responds to clicks).


## divide


Divides the number in a container by a number.

Examples:

```


put 12 into x
divide x by 3
answer x -- will display "4"

put "1,12,3" into x
divide item 2 of x by 3
answer x -- will display "1,4,3"



```



## delete (object or text)


**Deleting objects**


```
-- delete objects
delete cd btn "myBtn"
delete card 14
```


**Deleting text**


```
put "abcde" into x
delete char 2 of x
answer x -- shows "acde"
```



```
put "abcde" into x
delete char 2 to 4 of x
answer x -- shows "ae"
```



```
put "abcde" into cd fld 1
delete char 2 to 4 of cd fld 1
```


Deleting words, lines and items is also supported for compatibility with HyperCard but is not recommended in new code, as HyperCard's behavior can be inconsistent and non-intuitive.

Examples:

```


-- we support complex expressions
delete char 2 to 4 of item 3 of line 5 of myVar
delete item 3 of line 3 to 5 of myVar
delete first item of myVar
delete second item of myVar
delete last item of myVar
delete item 3 of myVar
delete line 3 of myVar
delete word 3 of myVar

-- we do not support backwards ranges
delete item 3 to 2 of myVar

-- we do not support out-of-order scopes
-- (unless you go Object->Stack Info and turn on compatibility mode)
delete line 3 of item 3 of myVar -- error
delete item 3 of word 3 of myVar -- error
delete word 3 of char 3 of myVar -- error
delete word 3 of word 4 of myVar -- error

-- we do not support deleting a range (unless chars)
delete word 3 to 5 of myVar -- not yet supported




```



## drag


Use the drag command for programmatically drawing pictures. Remember to first use the choose command to indicate what to draw.

Examples:

```


choose line tool
drag from 10,20 to 30,40
-- this draws a line starting at the coordinates (10,20) 
-- ending at (30,40)

choose curve tool
drag from 10,20 to 30,40 to 50,60



```



## enable


Enables a button (sets the "enabled" property to false, so that the button is no longer disabled).


## go to card


Go to a different card.

Examples:

```


go to card 1 -- goes to first card
go first -- goes to first card
go last -- goes to last card
go next -- goes to the next card
go prev -- goes to the previous card

The following are supported:
last
middle
any
first
second
third
fourth
fifth
sixth
seventh
eigth
ninth
tenth
next
previous
this
mid
prev

('go back' and 'go forth' are supported for compatibility with old scripts.)



```



## hide


Hides a button or field.

(sets the "visible" to false)


## multiply


Multiplies the number in a container by a number.

Examples:

```


put 12 into x
multiply x by 3
answer x -- will display "36"

put "1,12,3" into x
multiply item 2 of x by 3
answer x -- will display "1,36,3"

multiply cd fld 1 by 5


```



## lock screen


This feature will arrive in a future version...


## play



Play a sound effect.

For example, to play a chime sound,


```
play "glider_1_Extra" load
wait 4 seconds
play "glider_1_Extra"
```


You should load the sounds you will use in advance, such as in a game initialize() routine, so that when you play them, there will not be a delay.

You can't say `play ("glider" & x)`, instead do the equivalent `put "glider" & x into tmp; play tmp`

ViperCard can play the following sounds:


```
glider_1_Aww
glider_1_Bass
glider_1_BeamIn
glider_1_BlowerOn
glider_1_Bounce
glider_1_Clock
glider_1_Crunch
glider_1_Drip
glider_1_Energize
glider_1_Extra
glider_1_FireBand
glider_1_GetBand
glider_1_GoodMove
glider_1_GreaseFall
glider_1_Guitar
glider_1_Hey!
glider_1_Lightning
glider_1_LightsOn
glider_1_Pop
glider_1_Push
glider_1_Shredder
glider_1_Tick
glider_1_ToastDrop
glider_1_ToastJump
glider_1_Yow!
glider_1_Zap
```



## put


Put an expression into a variable or field.

Examples:

```


put 2+3 into x
answer x -- shows 5

put "hello" into cd fld "message"

put "aa,bb,cc" into x
put "11" into item 2 of x
answer x -- shows "aa,11,cc"

put "abc" into x
put "q" into char 2 of x
answer x -- shows "aqc"

put "appended text" after x
put "prepended text" before x

-- if the message box is open, you can display the contents of a variable into the message box,
-- this is similar to "print" or "writeline" in other languages.
put 2+3 into x
put x into the msg box



```



## replace


Replace all occurrences of a string.

Examples:

```

put "a-b-c" into x
replace "-" with "_" in x
answer x -- shows a_b_c


-- you can also use replace in a field.
put "-" into search
put "_" into replacement
replace search with replacement in cd fld "myFld"


```



## select


Set the selection in a field. For this to take effect, the field must be on the current card.

Examples:

```


-- set the selection
select char 2 to 4 of cd fld "myFld"
select line 3 of cd fld "myFld"
select item 2 to 3 of cd fld "myFld"

-- set the caret position
select before char 3 of cd fld "myFld"
select before line 3 of cd fld "myFld"
select after char 3 of cd fld "myFld"
select before text of cd fld "myFld"
select after text of cd fld "myFld"

-- select all
select text of cd fld "myFld"

-- clear selection
select empty

-- look up field by string
select char 1 of the selectedField


```



## send


Take a string, and execute it as if it were a ViperCard script in the context of an object.

Messages in ViperCard automatically travel upwards from button to card, background, and then stack.

But by using the 'send' command, you can send a message to any target -- from a card down to a button, from one card to a different card, and so on. One case where this is helpful is if you have a large amount of code in one script: subroutines can be moved to other objects and called via send.

Examples:

```


-- sending a message to a different card
send "prepareNextCard" to card "otherCard"

-- simulate a button click
send "mouseUp" to cd btn "myButton"

-- if you have hundreds of lines of code in one script, this
-- can feel disorganized. with "send" you can store code
-- in other objects, for example, moving
-- mathematical computation to a different card or button.
-- in the script of cd btn "mathUtils" of card "otherCard", write
on myCompute a, b
return a * a + b
end myCompute

-- from another script
send "myCompute 3, 4" to cd btn "mathUtils" of card "otherCard"
put the result into x


```



## set


Use the set command to change a property.

A few examples:


```
set the width of cd btn "myButton" to 100
set the topLeft of cd btn "myButton" to 24, 25
put the long name of btn "myButton" into x
set the textsize of char 2 to 4 of cd fld "myFld" to 18 
set the itemdelimiter to "|"
```


See the "Properties" section of documentation for more.



## show


Shows a button or field.

(sets the "visible" to true)


## sort


New: 'sort by each' expressions.

Sort styles:
* text sorting (default), compares text, not case sensitive.
* numeric sorting, interpret as numbers, e.g. 10 sorts after 2.
* ascending (default)
* descending

Sort granularity:
* sort items of x
* sort lines of x
* sort chars of x

Examples:

```


put "aa,cc,bb" into x
sort items of x
answer x -- displays "aa,bb,cc"

put "aa|cc|bb" into x
set the itemDelimiter to "|"
sort items of x
answer x -- displays "aa|b|cc"

put "ac,bb,ca" into x
sort items of x by char 2 of each
answer x -- displays "ca,bb,ac"

-- numeric is needed!
put "12,24,1,5" into x
sort items of x numeric
answer x -- displays "1,5,12,24"

put "12,24,1,5" into x
sort descending items of x numeric
answer x -- displays "24,12,5,1"



```



## subtract


Subtracts a number from the number in a container.

Examples:

```


put 12 into x
subtract 3 from x
answer x -- will display "9"

put "1,12,3" into x
subtract 3 from item 2 of x
answer x -- will display "1,9,3"

subtract 1 from cd fld "myFld"


```



## unlock screen


This feature will arrive in a future version...



## wait


Pauses the script. By default waits in "ticks", which are 60th of a second.

Examples:

```


wait 500 ms -- pauses for half a second.

--(A paused script can be terminated by clicking the Stop icon in the
--navigation palette, or by changing to the button or field tool.)

wait until the mouseH > 120
wait until the shiftKey
wait until the mouseClick -- now supported

wait 5 seconds
wait 5 ticks
wait 5 milliseconds
wait 5 ms


```



## visual effect


This feature will arrive in a future version...

