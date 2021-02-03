import { connect } from 'react-redux';
import Form from './Form';

const mapStateToProps = (state, props) => {
    return {
        data: state.jsonforms.core.data,
        schema: state.jsonforms.core.schema.proposal,
        uischema: state.jsonforms.core.uischema.proposal,
        errors: state.jsonforms.core.schema,
    }
}

export default connect(
    mapStateToProps
  )(Form);
  