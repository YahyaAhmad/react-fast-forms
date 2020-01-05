# react-fast-forms
A light-weight dynamic form builder for react apps.

## Get Started
```diff
! DOCUMENTATION IS NOT COMPLETE
```

### Simple Form
```javascript
import  React  from  'react'
import { Form, createContainer, createField } from  'react-fast-forms';
const  MainApp = () => {
	const  container = createContainer();
	const  userName = createField("text", "username")
	    .setLabel("Username");
	const  password = createField("password", "password")
	    .setLabel("Password");
	container.addFields([userName, password]);
	return (
	    <div>
	        <Form  debug={true}  container={container}  />
	    </div>
	)
}
  
export  default  MainApp
```
![enter image description here](https://github.com/YahyaAhmad/react-fast-forms/raw/2.x-dev/assets/simple.png)

### Setting up a nice validator
```javascript
import  React  from  'react'
import { Form, createContainer, createField } from  'react-fast-forms';
const  MainApp = () => {
	const  container = createContainer();
	const  userName = createField("text", "username")
	    .setLabel("Username");
	const  password = createField("password", "password")
	    .setLabel("Password")
	    .setValidator((value, setError) => {
			if (value && value.length <= 5) {
				setError("Password length should be more than 5")
			}
		});
	container.addFields([userName, password]);
	return (
	    <div>
	        <Form  debug={true}  container={container}  />
	    </div>
	)
}
  
export  default  MainApp
```
![enter image description here](https://github.com/YahyaAhmad/react-fast-forms/raw/2.x-dev/assets/required.png)
