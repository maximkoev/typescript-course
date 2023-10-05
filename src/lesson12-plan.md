# React framework quick start

--

## What is React
- React is a JavaScript library for building user interfaces
- View layer for web and mobile apps
- Component-based
- Declarative - describes the state of the UI at any point in time and React will automatically manage all UI updates when the underlying data changes

--

## Creating a React App
- Project setup with create-react-app
- Project setup with vite

--

## Creating a React Component
- Functional Components
- Class Components
- JSX

--

## How React Works - virtual DOM

- Virtual DOM
  - it is a representation of the DOM in memory
  - it is a tree of React elements and components
  - it is lightweight and detached from the browser-specific implementation details
- Reconciliation
  - the process of updating the DOM with the results of rendering the components
  - allows React to update only the parts of the DOM that need to be updated
  - you can think of it as a diffing algorithm, where React finds the differences between the previous and the current state of the DOM and updates only the parts that have changed

--

## React Ecosystem
- React is just a view layer
- It is not a complete framework
- Responsible for rendering the UI fro the state
- Organizing the UI into components
- Need to use other libraries for routing, state management, etc.
- React Router
- Redux (Redux Toolkit, etc.)
- Component libraries (Material UI, Ant Design, etc.)
- Form libraries (Formik, React Hook Form, etc.)
- Testing libraries (Jest, React Testing Library, etc.)
- etc.

--

## Building first components
- Creating an Item Component
- Creating a List Component
- Fragments
- Rendering array of items, keys
- Conditional Rendering
- Handling Events
- Managing State
- Passing Data via Props - props Interface
- Passing Functions via Props
- Passing Children
- Inspecting Components with React Dev - Tools

--

## React styling
- Inline Styles
- CSS Stylesheets
- CSS Modules
- CSS in JS, Styled Components
- Popular UI Libraries
  
--

## React hooks
- useState
- useEffect
- useRef
- useContext
- useReducer
- useCallback
- useMemo
- useImperativeHandle
- useLayoutEffect
- useDebugValue
- Custom Hooks

