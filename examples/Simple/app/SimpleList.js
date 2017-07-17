import React, { Component } from 'react';

import { ListView } from 'react-native';

import Row from './Row';

export default class SimpleList extends Component{
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this._genrows()),
    };
  }

  _genrows(){
    let rows = [];
    for (let i = 0; i < 20; i++) {
      let rowtmp = {};
      rowtmp.name = 'Test ' + i;
      rows.push(rowtmp);
    }
    return rows;
  }

  _renderRows(rowData){
    return(
      <Row title={rowData.name} />
    )
  }

  render(){
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>this._renderRows(rowData)}
      />
    )
  }
}