import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import styles from './style'
import Video from 'react-native-video';
import { URL_LOCAL, ICON_SCAN, VIDEO, WELCOME, LOGO, RIGHT_ARROW } from '../../utils/constant'



interface ParametersType {
  id:string,
}

type passParamToNewScreen = (where:string, params?:ParametersType) => void;


interface EventTypeScanCode {
  data:string,
}

const Welcome = (props:{navigation:{navigate:passParamToNewScreen }}) => {
  const {navigation} =props
  const onSuccess = async (e:EventTypeScanCode) => {

    if (e.data) {
      navigation.navigate('Info', { id: e.data })
    } else {
      navigation.navigate('Error')
    }
  };
  const onBuffer = () => {

  }
  const videoError = () => {

  }
  const [isPause, setIsPaused] = useState(true);
  useEffect(() => {
    return () => setIsPaused(true)
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground source={URL_LOCAL} style={styles.imgBackground}>
        <View style={styles.box1}>
          <View style={styles.containerWelcome}>
            <Image resizeMode="contain" style={{ width: 100, height: 100 }} source={LOGO} />
            <Image resizeMode="contain" style={{ width: 300, height: 20 }} source={WELCOME} />
            <View style={styles.boxOutside}>
              <Video source={VIDEO}
                controls
                paused={!isPause}
                repeat
                hideShutterView={false}
                resizeMode="stretch"
                onBuffer={onBuffer}
                onError={videoError}
                onLoad={() => {
                  setIsPaused(!isPause);
                }}
                style={styles.backgroundVideo} />
            </View>
          </View>
          <View style={styles.containerLogoScan}>
            <Image
              style={styles.tinyLogo}
              source={ICON_SCAN}
            />
            <Text style={styles.textLogoScan}>Follow the arrow to scan card</Text>
          </View>
        </View>
        <View style={styles.content}>
          <QRCodeScanner
            ref={(node) => {
              if (node) {
                node.reactivate()
              }
            }}
            onRead={onSuccess}
            cameraType='back'
            cameraStyle={{ width: 100, height: 100 }}
            containerStyle={{ alignItems: "center" }}
          />
        </View>
        <Image resizeMode="contain" style={{ position: "absolute", width: 50, height: 50, bottom: "10%", right: 20 }} source={RIGHT_ARROW} />
      </ImageBackground>
    </View>
  )
}
export default Welcome;