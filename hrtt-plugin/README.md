# Remote Object Plugin for Inquirer-gui

This inquirer-gui plugin enables selecting a SAP HANA remote object.

![Inquirer-gui Remote Object Selection](./remote-object.png)

It can be used in Visual Studio Code or in [Theia](https://github.com/eclipse-theia/theia).

### Sample Question
```js
  {
    type: "checkbox",
    guiType: "remote-object-selection",
    name: "remoteObject",
    message: "Remote Object",
    getDatabases: async () => {
      return ["<NULL>"];
    },
    getSchemas: async () => {
      return ["schema 1", "schema 2"];
    },
    getTypes: async () => {
      return ["TABLE"];
    },
    search: async (database, schema, object, type) => {
      const remoteObjects = [];
      for (let i=0; i<3; i++) {
        remoteObjects.push({
          value: `${i} REMOTE_OBJECT_VALUE`,
          database: `${i}-${database} DATABASE_NAME`,
          schema: `${i}-${schema} SCHEMA`,
          object: `${i}-${object} OBJECT`,
          type: `${i}-${type} TYPE`
        });
      }
      return remoteObjects;
    },
    choices: () => {
      return [{
        value: `REMOTE_OBJECT_VALUE`,
        name: `Run in inquirer-gui`
      }];
    }
  }
```
