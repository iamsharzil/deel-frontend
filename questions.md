Please answer the following questions to the best of your knowledge, in clear

English. Elaborate and try to demonstrate the React knowledge you have. Feel free

to give examples and use cases.

DO NOT USE ANY WEB OR OTHER RESOURCE.

What is the difference between Component and PureComponent? Give an example where it might break my app.

> The difference between the Regular component and the Pure component is
> that the Regular component will always re-render when the Parent
> component re-renders, whereas the Pure component will only render when
> its props or state changes.
>
> The Regular component does not do a shallow comparison, and thus
> always re-render, whereas, The Pure component does shallow props and
> state comparison.
>
> A shallow comparison happens for primitive as well as complex types.
>
> A primitive type returns true when two values are of the same type and
> value (string, number, boolean).
>
> On the other hand, A complex type returns true when two values are
> referencing the same object.
>
> One example where the behaviour might be unexpected is that creating
> and setting a new reference of the same state in `componentDidMount`.
> It will cause a re-render after every 2 seconds.

```

class PureComponent extends React.PureComponent {
	state = {
		data: ['Dog', 'Cat', 'Chicken']
	};

	componentDidMount() {
		setInterval(() => {
		const newData = [...this.state.data];
		this.setState({ data: newData });
		}, 2000);
	}

	render() {
		console.log('pure')
		return (
			<div>{this.state.data.toString()}</div>
		)}
}

```

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

> I haven't used this approach yet but what I could guess is that
> shouldComponentUpdate would not automatically update the context
> changes as it never consider context values for comparison.
> There has to be manual checks to track context changes as well.

3. Describe 3 ways to pass information from a component to its PARENT.
   > Following are the examples in hooks, but same applies to class
   > component as well.

```

// 1.Callback Prop
const Parent = () => {
	const handleClick = (data) => {
		// Handle data from child
	};

	return <Child onClick={handleClick} />;
};

const Child = ({ onClick }) => {
	const handleClick = () => {
		const data = "Child 1";
		onClick(data);
	};

return <button onClick={sendDataToParent}>Send Data</button>;
};

// 2. Via Context
const ContextProvider = ({ children }) => {
  const [name, setName] = useState("john");
  const data = { name, setName };
  return <MyContext.Provider value={data}>{children}</MyContext.Provider>;
};

const Parent = () => {
  return (
    <ContextProvider>
      <Child />
    </ContextProvider>
  );
};

const Child = () => {
// A very basic example, ideally there will be redux and actions to dispatch
  const {name, setName} = useContext(MyContext);
  return <div onClick={() => setName("Mike")}>{name}</div>;
};

// 3. Using State management library like Redux
```

4. Give 2 ways to prevent components from re-rendering.

> We can use React.memo for Hooks and shouldComponentUpdate for Class
> based components.
>
> Additionally, we have useMemo and useCallback to memoize values and
> functions. This also helps in preventing re-rendering.

5. What is a fragment and why do we need it? Give an example where it might break my app.
   > Fragment helps wrapping the component with the DOM elements when it's
   > not required.
   >
   > We can wrap the component either with React.Fragment or just pass
   > `<>...</>`
   >
   > e.g.

```
const List = () => {
  return (
    <>
      <ul>
        <li>{children}</li>
      </ul>
    </>
  );
};
<section> <List/> </section>
```

> Few issues that can come without using Fragment is:
>
> a. You've a use case where you are selecting ul element (for eg) that's
> immediate child of section. If you wrap the List component with div,
> the CSS will break.
>
> b. Semantic HTML, It might be possible that a component is wrapped
> inside `<p><Component/></p> ` and the Component is again using p tag
> like `<p><span>test</span></p>`. This is semanticallty incorrect and
> can be fixed by writing `<><span>test</span></>`.

7. Give 3 examples of the HOC pattern.

> 1. One common pattern that we usually see is for authentication, where we
>    pass login related info to components via HOC if the user is
>    authenticated.
> 2. The other common HOC pattern is to wrap the required
>    component with the Loader HOC and show the component after loading.
> 3. Another HOC pattern would be to fetch data from the API and pass the
>    data to the wrapped component.

8. What's the difference in handling exceptions in promises, callbacks and async...await?

> With promises we can handle the exceptions using .catch() method like:

```
fetch("url")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed");
    }

    return response.json();
  })

  .catch((error) => {
    console.error("An error occurred:", error); // Request Failed
  });
```

> with callbacks we can handle via:

```
function callbackException(errorHandler) {
  try {
    const result = calculateResult(); // Some operation that might throw an error

    errorHandler(null, result);
  } catch (error) {
    errorHandler(error, null);
  }
}
```

> with async await we can handle the exceptions by using try catch block

```
(async () => {
  try {
    await promise();
  } catch (e) {
    console.log("async/await", e.message); // Request failed
  }
})();
```

8 How many arguments does setState take and why is it async.

> setState takes two arguments (newState, cb)
> newState - a new value that you want to update. eg. this.setState({name:"Mike"})
> cb (optional) function will immediately return the updated value
> e.g.

```
this.setState({
	name:'Mike'
	},() => { console.log(this.state.name); // Mike
});
```

> The reason why setState is async is because React batches state
> updates to prevent unnecessary re-renders and optimize re-rendering.

9. List the steps needed to migrate a Class to Function Component.

   > a. Create a function component.
   > b. Use useState hook to manage state
   > c. Pass props as an parameter to the function component
   > d. Use `useEffect` hook wherever `componentDidMount`,
   > `componentDidUpdate`, and `componentWillUnmount` is used
   > e. Convert event handler defined as `this.handleClick` to `const
handleClick = () => {}`

10. List a few ways styles can be used with components.
    > a. Inline style `<p style={{color:"blue"}}>Test</p>`
    > b. Class Name `<p className="color">Test</p>`
    > c. Styled components using external library

```
const StyledPara = styled.div`
	color: red;
`;

<StyledPara>Styled with Styled Components</StyledPara>

```

11. How to render an HTML string coming from the server.
    > use some external library to sanitize the data before passing it to
    > dangerouslySetInnerHTML to prevent attacks

`<div dangerouslySetInnerHTML={{ __html: <p>Test</p> }}></div>;`
