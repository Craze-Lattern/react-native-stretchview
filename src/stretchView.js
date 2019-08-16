import React, { Component } from 'react';

import PropTypes from 'prop-types';

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
    const { expanded } = this.props;
    if (nextProps.expanded !== expanded) {
      this.stretch(nextProps.expanded);
    }
  }

  stretch(expanded) {
    const {
      stretchDuration,
      animateDistance,
      onAnimationStart,
      syncAnimations,
      onAnimationEnd,
    } = this.props;
    const { animateHeight } = this.state;
    const duration = stretchDuration;

    const toValue = expanded ? animateDistance : 0;

    if (onAnimationStart) {
      onAnimationStart();
    }

    let animations = [
      Animated.timing(animateHeight, {
        toValue,
        duration,
      }),
    ];

    if (syncAnimations) {
      animations = animations.concat(syncAnimations());
    }

    Animated.parallel(animations).start();

    if (onAnimationEnd) {
      onAnimationEnd(duration, toValue);
    }
  }


  render() {
    const {
      expanded,
      renderTopFace,
      renderBottomFace,
    } = this.props;
    const { animateHeight } = this.state;
    const pointerEvents = expanded ? 'box-none' : 'auto';
    return (
      <View style={styles.container}>
        {
          renderTopFace()
        }
        <Animated.View
          style={{
            height: animateHeight,
            overflow: 'hidden',
          }}
          pointerEvents={pointerEvents}
        >
          {
            renderBottomFace()
          }
        </Animated.View>
      </View>
    );
  }
}

StretchView.propTypes = {
  stretchDuration: PropTypes.number,
  renderTopFace: PropTypes.func.isRequired,
  renderBottomFace: PropTypes.func.isRequired,

  animateDistance: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
  onAnimationEnd: PropTypes.func,
  onAnimationStart: PropTypes.func,
  syncAnimations: PropTypes.func,
};

StretchView.defaultProps = {
  stretchDuration: 250,
};
