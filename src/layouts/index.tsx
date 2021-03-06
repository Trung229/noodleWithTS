import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ImageBackground,
    Image
} from 'react-native';
import { URL_LOCAL, LOGO } from '../utils/constant'
import styles from './style'

interface LayoutReceive {
    children:{},
    title: string
}

const Layout = (props:LayoutReceive) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={URL_LOCAL} style={styles.imgBackground}>
                <View style={styles.containerWelcome}>
                    <Image resizeMode="contain" style={{ width: 100, height: 100 }} source={LOGO} />
                    <Image resizeMode="contain" style={{ width: 300, height: 20, marginBottom:20 }} source={Number(props.title)} />
                </View>
                <View style={styles.content}>
                    {props.children}
                </View>
            </ImageBackground>
        </View>
    )
}

export default Layout;






/***
 * 
 * 
  console.log(`Dinner is served. We’re having ${foodArray[0]}, ${foodArray[1]}, ${foodArray[2]}, and ${foodArray[3]}.`)

  console.log(`Dinner is served. We're having ${foodArray[0]}, ${foodArray[1]}, ${foodArray[2]}, and ${foodArray[3]}.`);
 * 
 * 
 * 
 */