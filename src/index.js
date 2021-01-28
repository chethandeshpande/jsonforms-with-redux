import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './AppContainer';
import reportWebVitals from './reportWebVitals';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import { Actions, jsonformsReducer } from '@jsonforms/core';
import {
  materialRenderers,
  materialCells
} from '@jsonforms/material-renderers';
import { JsonFormsReduxContext } from '@jsonforms/react';
import { composeWithDevTools } from "redux-devtools-extension";
import fileUploadTester from './fileUploadTester';
import FileUploadContainer from './FileUploadContainer';
import fileUploadReducer from "./fileUploadReducer";
const schema = {
  "type": "object",
  "properties": {
    "crop": {
      "title": "Crop",
      "type": "object",
      "properties": {
        "cropType": {
          "type": "string",
          "pattern": "^[A-Z]",
          "description": "Specify Crop type"
        },
        "size": {
          "description": "Size of the crop",
          "type": "integer"
        },
        "measurements": {
          "description": "Measurement Units",
          "type": "string",
          "additionalProperties": false,
          "masterlist": "measurementUnits",
          "enum": [
            "cm",
            "mts",
            "in"
          ]
        },
        "picture": {
          "type": "string",
          "contentEncoding": "base64",
          "contentMediaType": "image/png"
        }
      },
      "required": [
        "cropType",
        "size",
        "picture"
      ]
    },
  }
};
const uischema = {
  "type": "Group",
  "label": "Crop",
  "elements": [
    {
      "type": "Control",
      "label": "Type of the crop",
      "scope": "#/properties/crop/properties/cropType"
    },
    {
      "type": "Control",
      "scope": "#/properties/crop/properties/size"
    },
    {
      "type": "Control",
      "scope": "#/properties/crop/properties/picture"
    },
    {
      "type": "Control",
      "scope": "#/properties/crop/properties/measurements"
    }
  ]
};
const data = {
  crop: {
    cropType: "Rice",
    size: 10,
    picture:[]
  }
};

const store = createStore(
  combineReducers({ jsonforms: jsonformsReducer(), fileUploadReducer }),
  {
    jsonforms: {
      cells: materialCells,
      renderers: materialRenderers
    }
  },
  composeWithDevTools()
);

store.dispatch(Actions.init(data, schema, uischema));
store.dispatch(Actions.registerRenderer(fileUploadTester, FileUploadContainer));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <JsonFormsReduxContext>
        <App />
      </JsonFormsReduxContext>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
