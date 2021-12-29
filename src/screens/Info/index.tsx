import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import { fetchAPI, updateNoodle } from '../../services/noodle'
import Layout from '../../layouts'
import { INFORMATION, NOODLE_AVAILABLE_1, NOODLE_AVAILABLE_2, NOODLE_AVAILABLE_3, NOODLE_IS_TAKEN } from '../../utils/constant'
import styles from './styles'
import MyButton from '../../components/MyButton/myButton'



const arrNoodle = [
    NOODLE_AVAILABLE_1,
    NOODLE_AVAILABLE_2,
    NOODLE_AVAILABLE_3
]

interface routeType {
    params:{ id:string}
}

interface navigationType {
    navigate:(where:string) => void;
}

interface objReceiveType {
    route:routeType,
    navigation:navigationType
}


interface itemFromDB {
    isTaken:boolean;
    name:string,
}

interface DateType {
    nanosecond:number,
    seconds:number
}

interface DefaultRootStateType {
    data:{payload:userType},
    id:string
    noodleAvailable: {isTaken:boolean, name:string}[]
}

interface userType{
    avatar:string,
    birthDay:DateType,
    department:string,
    fullName:string,
    gender:string,
    noodleAvailable:itemFromDB[]
}

const Info = (props:objReceiveType) => {
    const {route:{params:{id}}, navigation} = props;
    const noodle = useSelector((state:DefaultRootStateType) => state?.data?.payload)
    let count = []
    const [arrState, setArrState] = useState(noodle?.noodleAvailable)
    function handleGetNoodle() {
        let temp_Arr = [...arrState];
        let temp_Element = { ...temp_Arr[count.length - 1] };
        temp_Element.isTaken = true;
        temp_Arr[count.length - 1] = temp_Element
        setArrState(temp_Arr)
        if (arrState) {
            navigation.navigate('Done');
        }
    }
    function goBack() {
        navigation.navigate('Welcome');
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: 'noodle/saveID',
            payload: id,
        })
        dispatch(fetchAPI)
        return () => {
            dispatch({
                type: 'noodle/saveID',
                payload: 0,
            })
            dispatch({
                type: 'noodle/saveData',
                payload: undefined,
            })
        }
    }, [])
    useEffect(() => {
        setArrState(noodle?.noodleAvailable)
    }, [noodle])
    useEffect(() => {
        dispatch({
            type: 'noodle/saveNoodle',
            payload: arrState,
        })
        dispatch(updateNoodle)
    }, [arrState])
    useEffect(() => {
        return () => {
            dispatch({
                type: 'noodle/saveNoodle',
                payload: null,
            })
        }
    },[])
    return (
        <Layout title={INFORMATION}>
            {noodle ?
                <>
                    <View style={styles.borderOutside}>
                        <View style={styles.containerInfo}>
                            <View style={styles.containerLeft}>
                                <Image
                                    style={{ width: 100, height: 100, borderRadius: 100 }}
                                    source={{
                                        uri: noodle.avatar,
                                    }}
                                />
                            </View>
                            <View style={styles.containerRight}>
                                <View style={styles.containerText}>
                                    <Text style={styles.textBold}>Full Name:</Text>
                                    <Text style={styles.textNormal}>{noodle.fullName}</Text>
                                </View>
                                <View style={styles.containerText}>
                                    <Text style={styles.textBold}>BirthDay:</Text>
                                    <Text style={styles.textNormal}>{moment.unix(noodle?.birthDay?.seconds).format('DD MMM YYYY')}</Text>
                                </View>
                                <View style={styles.containerText}>
                                    <Text style={styles.textBold}>Gender:</Text>
                                    <Text style={styles.textNormal}>{noodle.gender}</Text>
                                </View>
                                <View style={styles.containerText}>
                                    <Text style={styles.textBold}>Department:</Text>
                                    <Text style={styles.textNormal}>{noodle.department}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerNoodle}>
                        {noodle.noodleAvailable.map((item:itemFromDB, index:number) => {
                            const randomNoodle = Math.floor(Math.random() * arrNoodle.length);
                            if (!item.isTaken) count.push(item)
                            return (!item.isTaken ?
                                <Image
                                    resizeMode="contain"
                                    style={{ width: 100, height: 100, marginTop: 10 }}
                                    key={index}
                                    source={arrNoodle[randomNoodle]} /> :
                                <Image
                                    resizeMode="contain"
                                    key={index}
                                    style={{ width: 100, height: 100, marginTop: 10 }}
                                    source={NOODLE_IS_TAKEN} />
                            )
                        })}
                    </View>
                    <View style={styles.containerTextAvailable}>
                        <Text style={styles.textLength}>{count.length}</Text>
                        <Text style={styles.text}>cups of noodles left this month</Text>
                    </View>
                    {count.length <= 0 ?
                        <MyButton title="Come back next month" handleEvent={goBack} /> :
                        <MyButton title="Get your noodles" handleEvent={handleGetNoodle} />}
                </> :
                <ActivityIndicator size="large" color="#00ff00" />
            }
        </Layout>
    )
}
export default Info;