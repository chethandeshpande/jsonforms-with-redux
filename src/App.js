import React from 'react';
import { JsonFormsDispatch } from '@jsonforms/react';
// other imports...

const onClick = (data) => {
  return () => {
    console.log(data)
  }
}

export default ({ data, schema, uishema, errors }) => (
  <div>
    {/* other markup... */}
    <JsonFormsDispatch />
    <button type="button" onClick={onClick(data)}>Save Proposal</button>
  </div>
)