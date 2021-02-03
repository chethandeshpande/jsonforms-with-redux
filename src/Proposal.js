import React from 'react';
import { JsonFormsDispatch } from '@jsonforms/react';
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

export default (props) => {
  return (
      <div>
        <JsonFormsDispatch schema={props.schema} uischema={props.uischema} data={props.data}
                           // onChange={handleChange.bind(null, props)}
                           // onPress = {handleChange.bind(null, props)}
        />
        <button type="button" onClick={handleChange.bind(null, props)}>Save Proposal</button>
      </div>
  )
}