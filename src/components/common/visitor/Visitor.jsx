import React from 'react';
import { Admin, Resource, List, Datagrid, TextField } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
const EntryList = (props) => (
  <List {...props}>
      <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" label="氏名" />
          <TextField source="affiliation" label="所属" />
          <TextField source="email" label="メールアドレス" />
      </Datagrid>
  </List>
);


const Visitor = () => {
  return (
    <Admin dataProvider={simpleRestProvider('http://localhost:3000')}>
      <Resource name="entries" list={EntryList} />
    </Admin>
  );
};

export default Visitor;
