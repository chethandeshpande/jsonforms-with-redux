import React from 'react';
import { JsonFormsDispatch } from '@jsonforms/react';
import {
    materialRenderers,
    materialCells
  } from '@jsonforms/material-renderers';
  
export default ({ schema, uischema, data }) => {
    return (
        <div>
            <JsonFormsDispatch
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
/>
        </div>
    )
}