import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';

export default withJsonFormsControlProps(({ data, handleChange, path }) => {
	return (<div>
		{JSON.stringify(data)}
		{path}
				<input type="file" id="myFile" name={path} />
			</div>
			)
})

