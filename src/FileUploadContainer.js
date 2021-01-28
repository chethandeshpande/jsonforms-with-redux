import { connect } from 'react-redux';
import FileUpload from './FileUpload';

const mapDispatchToProps = (dispatch) => ({
    addSize: () => dispatch({type: "ADD_SIZE"})
})

export default connect(
    () => {},
    mapDispatchToProps
  )(FileUpload);
  