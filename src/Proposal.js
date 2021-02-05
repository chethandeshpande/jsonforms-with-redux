import React from 'react';
import {
  JsonFormsDispatch,
  withJsonFormsContext,
  withJsonFormsControlProps,
  withJsonFormsLayoutProps
} from '@jsonforms/react';
import {Actions, jsonformsReducer, update} from '@jsonforms/core';
import shadows from "@material-ui/core/styles/shadows";

const onClick = (data) => {
  return () => {
    console.log(data)
  }
}

const contains = (elements, key) =>{
  return !!elements.find((ele) => ele.scope === `#/properties/${key}`)
}

const getUpdatedValues = (data, uischema) => {
  const schemaExtension = {}
  const updatedUischema = {...uischema}
  const updatedData = {...data}

  data.comments.forEach(comment => {
    if (comment.name) {
      schemaExtension[comment.name] = {type: comment.unitType || "string"};
      updatedData[comment.name] = "";

      if (!contains(updatedUischema.elements, comment.name)) {
        updatedUischema.elements.push({
          "type": "Control",
          "scope": `#/properties/${comment.name}`
        })
      }
    }
  })
  return {updatedUischema, schemaExtension, updatedData}
}

const handleChange = ({schema, data, uischema, updateSchema, updateUISchema, updateData, path}) => {
  const {updatedUischema, schemaExtension, updatedData} = getUpdatedValues(data, uischema)
  const updatedSchema = {...schema}
  updatedSchema.properties = {...schema.properties, ...schemaExtension}
  updateUISchema(updatedUischema)
  updateSchema(updatedSchema)
  updateData(path, () => ({...data, updatedData}))
}

let crop = "";

const measurmentsPerCrop =
  {
    Potato: [{name: "weight of potato"}, {name: "length of potato"}],
    sugarcane: [{name: "length of sugarcane"}, {name: "width of sugarcane"}]
  }

const handleCropChange = (updatedUiSchema, {updateData}) => {
  if (updatedUiSchema.data.crop && crop !== updatedUiSchema.data.crop) {
    updateData("measurements", () => measurmentsPerCrop[updatedUiSchema.data.crop])
    crop = updatedUiSchema.data.crop;
  }
}

export default withJsonFormsContext(({props}) => {
  return (
      <div>
        <JsonFormsDispatch schema={props.schema} uischema={props.uischema} data={props.data}
                           onChange={(e) => handleCropChange(e, props)}
        />
        <button type="button" onClick={handleChange.bind(null, props)}>Save Proposal</button>
      </div>
  )
})