# Users list component

1. For list of users component add delete logic to delete users 
    1. Add delete button to each of the user
    2. Use useState hook to store list of users
    3. Implement function to handle delete
    4. Make sure you create new list of users, do not mutate existing list
    5. Call setUsers with new list of users
    6.  Pass handleDelete to User component as prop
2. For each of the user add logic to like user  
    1. Add a Like button to each of the user
    2.  Add a state to keep liked state - is user liked or not (true/false) - useState, default value false
    3.  Implement logic to like user - click on the like button should change state of the user (liked/not liked
    4.  Display hart icon if user is liked (💝)
3.  For each of the user add buttons to move the user up/down the list
    1.  Add "Move Up" and "Move Down" buttons to each of the user
    2.  Implement functions to move user up/down the list 
    3.  Make sure you create new list of users, do not mutate existing list
    4.  Call setUsers with new list of users
    5.  Pass handleMoveUp and handleMoveDown to User component as props