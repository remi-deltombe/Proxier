
import * as React  from 'react';
import * as ReactDOM  from 'react-dom';

import { Button } from 'button'

ReactDOM.render(
	<div>
		<Button text="test" onClick={()=>console.log('onClick')}/>
	</div>, 
	document.getElementById('APP')
);
