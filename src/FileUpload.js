import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import {Actions} from "@jsonforms/core";

export default withJsonFormsControlProps(({ data, handleChange, path, updateUISchema,uischema1,
											  updateData,updateSchema,schema1 }) => {
	function updateState() {
		console.log("coming====");
		schema1.properties.crop.properties.copiedSize = {
			"description": "Size of the crop",
			"type": "integer"
		}
		updateSchema({...schema1})
		let updated = {
			"type": "HorizontalLayout",
			"elements": [{
				"type": "Control",
				"scope": "#/properties/crop/properties/size"
			},{
				"type": "Control",
				"scope": "#/properties/crop/properties/copiedSize"
			}]
		}


		updateUISchema({...uischema1, elements: [...uischema1.elements.slice(0,1),updated,uischema1.elements.slice(2,5)].flat()});
		console.log("updated")
	}

	function updateFileData(e) {
		const file = e.target.files[0];
		handleChange("crop.picture", [file])

	}

	return (<div>
				<input type="file" id="myFile" name={path} onChange={updateFileData} />
				<button type="submit" onClick={updateState}></button>
			</div>
			)
})
