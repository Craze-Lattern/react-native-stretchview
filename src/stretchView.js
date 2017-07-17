import React, {
  Component,
  PropTypes,
} from 'react';

import {
  StyleSheet,
  View,
  Animated,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class StretchView extends Component {
  static propTypes = {
    stretchDuration: PropTypes.number,
    renderTopFace: PropTypes.func.isRequired,
    renderBottomFace: PropTypes.func.isRequired,

    animateDistance: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    onAnimationEnd: PropTypes.func,
    onAnimationStart: PropTypes.func,
    syncAnimations: PropTypes.func,
  }

  static defaultProps = {
    stretchDuration: 250,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      animateHeight: new Animated.Value(0),
    };
  }

  componentWillMount() {
    this.stretch = this.stretch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.props.expanded) {
      this.stretch(nextProps.expanded);
    }
  }

  stretch(expanded) {
    const duration = this.props.stretchDuration;

    const toValue = expanded ? this.props.animateDistance : 0;

    if (this.props.onAnimationStart) {
      this.props.onAnimationStart();
    }

    let animations = [
      Animated.timing(this.state.animateHeight, {
        toValue,
        duration,
      }),
    ];

    if (this.props.syncAnimations) {
      animations = animations.concat(this.props.syncAnimations());
    }

    Animated.parallel(animations).start();

    if (this.props.onAnimationEnd) {
      this.props.onAnimationEnd(duration, toValue);
    }
  }


  render() {
    const pointerEvents = this.props.expanded ? 'box-none' : 'auto';
    return (
      <View style={styles.container} >
        {
          this.props.renderTopFace()
        }
        <Animated.View
          style={{
            height: this.state.animateHeight,
            overflow: 'hidden',
          }}
          pointerEvents={pointerEvents}
        >
          {
            this.props.renderBottomFace()
          }
        </Animated.View>
      </View>
    );
  }
}
