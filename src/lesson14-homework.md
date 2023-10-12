# Users list and form with api

1. Update User list component to fetch data from api
2. Add loading state to User list component (show loading message while list is loading)
3. Add buttons to move user up/down the list, store position in db json (add position field to each of the users)
4. Add form component to create new user shown as modal. Show form on click on the button "Add new user"    
5. Form to create user needs to have the following inputs
   1. User first name (text input)
   2. User last name (text input)
   3. User hair color (select input)
   4. User birthDate (datetime input)
   5. User is female (checkbox input)
   6. User email (email input)
6. Add form validation to the form component
   1. User first name is required
   2. User last name is required
   3. User email is required and should be valid email
   4. User birthDate is required and should be valid date
7. Form submit button of the form component should be disabled if form is invalid
8. Show error message for invalid fields
