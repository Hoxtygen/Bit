 ## Question
 Describe the process, in a react/redux project, to fetch a set of data from a remote API endpoint, then to store that data into redux and then to present it on the screen.


 ### Answer

 1. Create action types to desribe the type of possible actions that will the performed on the data to be fetched.
 
   ```
   const ActionTypes = {
	FETCH_DATA: "searchRepo",
	FETCH_DATA_SUCCESS: "searchRepo_success",
	FETCH_DATA_ERROR: "searchRepo_error",
}
```

2. Create action creator which is a function that will fetch data from the remote API. Actions will be dispatched in this function suplied with the corresponding action types. Fetch, axios or other agents can be used to fetch data from remote url.

```
const getData = (url) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_DATA });
    try {
      const { data } = await axios.get(url);
      dispatch({ type: ActionTypes.FETCH_DATA_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: ActionTypes.FETCH_DATA_ERROR, payload: err.message });
    }
  };
};

```


3. Create reducer function. This is a pure functions that contain the logic and calculation that needed to be performed on the state. It takes initial state and action type as arguments.

```
// Add initial state
const initialState = {
  loading: false,
  error: null,
  data: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_DATA:
      return {
        loading: true,
        error: null,
        data: [],
      };
    case ActionTypes.FETCH_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case ActionTypes.FETCH_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: [],
      };
    default:
      return state;
  }
};

```

4. Import reducer function into a reducer file. In case there are more than 1 reducers, we can use combineReducer method in redux to combine all reducers into a single object. Otherwise, we can pass just that single reducer.

```
const reducer = combineReducers({
  dataReducer,
});

```
5. Create the store and pass in the reducer(s)

```
const store = createStore(reducer);

```

6. Create the UI, wrap the UI element inside redux provider. Pass store as a prop to the Provider. import `useSelector()` from react-redux. It takes in a function argument that returns the part of the state that we want from the store. Also, the action creator is is imported to the UI component and invoked inside a `React` useEffect if we want to see the data on page load. The returned data is displayed on the UI


```
function App() {
  // retrieve data from the store
  const { data, error, loading } = useSelector((state) => state.dataReducer);

  // execute
  useEffect(() => {
    // invoke the action creator inside useEffect
    getData();
  }, []);
  return (
    <Provider store={store}>
      {data.map((item) => (
        <li>{item}</li>
      ))}
    </Provider>
  );
}


```