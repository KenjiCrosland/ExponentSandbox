/**
 * This is the entry point for your experience that you will run on Exponent.
 *
 * Start by looking at the render() method of the component called
 * FirstExperience. This is where the text and example components are.
 */
'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {HabitScreen} from './HabitScreen';


class FirstExperience extends React.Component {
  render() {

    return (

          <HabitScreen />
    );
  }
}

AppRegistry.registerComponent('main', () => FirstExperience);
