import React, { Component } from 'react';

import { ListView } from 'react-native';

import Row from './Row';

export default class SimpleList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(this.genrows()),
    };
  }

  genrows() { // eslint-disable-line class-methods-use-this
    const rows = [];
    for (let i = 0; i < 20; i++) { // eslint-disable-line no-plusplus
      const rowtmp = {};
      rowtmp.name = `Test ${i}`;
      rows.push(rowtmp);
    }
    return rows;
  }

  renderRows(rowData) { // eslint-disable-line class-methods-use-this
    return (
      <Row title={rowData.name} />
    );
  }

  render() {
    const { dataSource } = this.state;
    return (
      <ListView
        dataSource={dataSource}
        renderRow={(rowData) => this.renderRows(rowData)}
      />
    )
  }
}
