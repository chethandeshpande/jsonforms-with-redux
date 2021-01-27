import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = (state, props) => {
    return {
        data: state.jsonforms.core.data,
        schema: state.jsonforms.core.schema,
        uischema: state.jsonforms.core.uischema,
        errors: state.jsonforms.core.schema,
    }
}

export default connect(
    mapStateToProps
  )(App);
  