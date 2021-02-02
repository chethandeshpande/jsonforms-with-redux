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
import AddTreatmentContainer from "./AddTreatmentContainer";
import addTreatmentTester from "./addTreatmentTester";
import AddTreatment from "./AddTreatment";
const schema = {
  "type": "object",
  "properties": {
    "crop1": {
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
        },
        "showcrop2": {
          "type": "boolean"
        }
      },
      "required": [
        "cropType",
        "size",
        "picture"
      ]
    },
    "crop2": {
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
        },
        "showcrop3": {
          "type": "boolean"
        }
      },
      "required": [
        "cropType",
        "size",
        "picture"
      ]
    },
    "crop3": {
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
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Group",
      "label": "Crop1",
      "elements": [
        {
          "type": "Control",
          "label": "Type of the crop",
          "scope": "#/properties/crop1/properties/cropType"
        },
        {
          "type": "Control",
          "scope": "#/properties/crop1/properties/size"
        },
        {
          "type": "Control",
          "scope": "#/properties/crop1/properties/picture"
        },
        {
          "type": "Control",
          "scope": "#/properties/crop1/properties/measurements"
        },
        {
          "type": "Control",
          "scope":"#/properties/crop1/properties/showcrop2"
        }
      ],
    },
    {
      "type": "Group",
      "label": "Crop2",
      "elements": [
        {
          "type": "Control",
          "label": "Type of the crop",
          "scope": "#/properties/crop2/properties/cropType"
        },
        {
          "type": "Control",
          "scope": "#/properties/crop2/properties/size"
        },
        {
          "type": "Control",
          "scope": "#/properties/crop2/properties/picture"
        },
        {
          "type": "Control",
          "scope": "#/properties/crop2/properties/measurements"
        },
        {
          "type": "Control",
          "scope":"#/properties/crop2/properties/showcrop3"
        },

        {
          "type": "Control",
          "scope":"#/properties/crop1/properties/showcrop2"
        }
      ],
      "rule": {
        "effect": "SHOW",
        "condition": {
          "scope": "#/properties/crop1/properties/showcrop2",
          "schema": {
            "const": true
          }
        }
      }
    },
    {
      "type": "Group",
      "label": "Crop3",
      "elements": [
        {
          "type": "Control",
          "label": "Type of the crop",
          "scope": "#/properties/crop3/properties/cropType"
        },
        {
          "type": "Control",
          "scope": "#/properties/crop3/properties/size"
        },
        {
          "type": "Control",
          "scope": "#/properties/crop3/properties/picture"
        },
        {
          "type": "Control",
          "scope": "#/properties/crop3/properties/measurements"
        }
      ],
      "rule": {
        "effect": "SHOW",
        "condition": {
          "scope": "#/properties/crop2/properties/showcrop3",
          "schema": {
            "const": true
          }
        }
      }

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
store.dispatch(Actions.registerRenderer(addTreatmentTester, AddTreatmentContainer));

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
