import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';

const Main = () => {
    return (
        <View>
            <TouchableOpacity onPress={() => ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => { console.log('imagem', image) })}>
                <Text>Imagem</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Main