## React Native StretchView [![CircleCI branch](https://img.shields.io/circleci/project/guoyuan94/react-native-stretchview/master.svg)](https://circleci.com/gh/guoyuan94/react-native-stretchview) [![npm](https://img.shields.io/npm/v/react-native-stretchview.svg)](https://www.npmjs.com/package/react-native-stretchview) [![license](https://img.shields.io/npm/l/react-native-stretchview.svg)](https://github.com/guoyuan94/react-native-stretchview/blob/master/LICENSE)

StretchView implemented in JavaScript.

---

#### Example

The demo app can be found at `examples/Simple`.

To build and run the example app:

```sh
$ git clone https://github.com/guoyuan94/react-native-stretchview.git

$ cd react-native-stretchview/examples/Simple
$ npm install

# To deploy to iOS simulator:
$ npm run ios
```

#### Installation

##### Using npm:

```sh
$ npm install --save react-native-stretchview
```

##### Using yarn:

```sh
$ yarn add react-native-stretchview
```

#### Usage

```jsx
import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import StretchView from 'react-native-stretchview';

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
});

export default class Row extends Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    };
  }

  componentWillMount() {
    this.stretch = this.stretch.bind(this);
  }

  stretch() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  renderTopFace() {
    return (
      <View>
        <View style={{ height: styles.container.height, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <Text>First View</Text>
          <Text>{ this.props.title }</Text>
          <TouchableOpacity onPress={this.stretch}>
            <Text>Touch Me</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 1, backgroundColor: 'red' }} />
      </View>
    )
  }

  renderBottomFace() {
    return (
      <View style={{ height: styles.container.height, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Second View</Text>
      </View>
    )
  }

  render() {
    return(
      <StretchView
        renderTopFace={this.renderTopFace}
        renderBottomFace={this.renderBottomFace}
        animateDistance={styles.container.height}
        expanded={this.state.expanded}
      />
    )
  }
}
```

#### Props

| Prop | Type | Description |
|---|---|---|
|**`stretchDuration`**|`?number`|Length of stretch animation in milliseconds. _Default 250._|
|**`renderTopFace`**|`() => ReactElement<any>`|Callback that renders a top face.|
|**`renderBottomFace`**|`() => ReactElement<any>`|Callback that renders a bottom face.|
|**`expanded`**|`boolean`|Allows you to stretch and shrinkage the FoldView content.|
|**`onAnimationEnd`**|`?() => void`|Called when an animation ends.|
|**`onAnimationStart`**|`?() => void`|Called before an animation starts.|

#### License

[MIT](https://github.com/guoyuan94/react-native-stretchview/blob/master/LICENSE)


