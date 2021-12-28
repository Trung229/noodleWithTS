import React from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { BUTTON } from '../../utils/constant'
import styles from './styles'

type ButtonType = {
    title: string,
    handleEvent:() => void,
}

const MyButton = (props:ButtonType) => {
    return (
            <TouchableOpacity onPress={() => {props.handleEvent()}}>
                <Image resizeMode="contain" style={{ width: 250, height: 140 }} source={BUTTON} />
                <Text style={styles.textButton}>{props.title}</Text>
            </TouchableOpacity>
    )
}

export default MyButton;