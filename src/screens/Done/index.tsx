import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ImageBackground,
    Image,
    BackHandler,
} from 'react-native';
import Layout from '../../layouts'
import { PEOPLE_WITH_NOODLE, ENJOY_TEXT, DONE, HEART, DOWN_ARROW  } from '../../utils/constant'
import styles from './styles'
import MyButton from '../../components/MyButton/myButton'

type navigationType = {
    navigate:(where:string) => void;
}

type objReceiveType = {
    navigation:navigationType
}


const goBack = (navigation:navigationType) =>{
    navigation.navigate('Welcome')
}

const DoneScreen = (props:objReceiveType) =>{
    const {navigation} = props;
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return ()=> {
            backHandler.remove()
           };
    },[])
    return(
        <Layout title={DONE}>
            <Image resizeMode="contain" style={{width: 250, height: 250}} source={PEOPLE_WITH_NOODLE}/>
            <View style={styles.container}>
                <Image resizeMode="contain" style={styles.text} source={ENJOY_TEXT}/>
                <Image resizeMode="contain" style={styles.icon} source={HEART}/>
            </View>
            <MyButton title="Back to home" handleEvent={()=>goBack(navigation)}/>
            <View style={styles.containerBottom}>
                <Text style={styles.textDescription}>Get them below</Text>
                <Image resizeMode="contain" style={styles.downArrow} source={DOWN_ARROW }/>
            </View>
        </Layout>
    )
}
export default DoneScreen;