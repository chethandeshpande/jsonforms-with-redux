import React from 'react';
import {
  JsonFormsDispatch,
  withJsonFormsContext,
  withJsonFormsControlProps,
  withJsonFormsLayoutProps
} from '@jsonforms/react';
// other imports...

const onClick = (data) => {
  return () => {
    console.log(data)
  }
}

export default withJsonFormsContext((props) => {
      return (
          <div>
            {/* other markup... */}
            {/*<JsonFormsDispatch/>*/}
            {/*<button type="button" onClick={onClick(data)}>Save App</button>*/}
            hello
          </div>
      )

    }
)