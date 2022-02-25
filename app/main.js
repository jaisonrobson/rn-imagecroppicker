import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';

const Main = () => {
    const [image, setImage] = useState({})
    const [errorText, setErrorText] = useState("")

    const onSucessfulCropImage = (resultImage) => {
        console.log('resultImage', resultImage)
        setImage(resultImage)
        setErrorText("")
    }

    const onFailCropImage = () => {
        setImage({})
        setErrorText("Falha ao carregar imagem.")
    }

    const getImageFromPath = () => {
        if (image !== {} && image.path !== null) {
            return { uri: image.path }
        }

        return null
    }

    const getImageStyle = () => {
        if (getImageFromPath() !== null) {
            return {
                width: image.width,
                height: image.height,
                resizeMode: 'stretch',
            }
        }

        return {}
    }



    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Image
                style={{ ...styles.image, ...getImageStyle() }}
                source={getImageFromPath()}
            />

            <TouchableOpacity
                style={styles.cropImageButton}
                onPress={() => ImagePicker.openPicker({
                    width: 600,
                    height: 600,
                    cropping: true,
                }).then(onSucessfulCropImage, onFailCropImage)}
            >
                <Text>Escolher imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cropImageButton}
                onPress={() => ImagePicker.openCamera({
                    width: 600,
                    height: 600,
                    cropping: true,
                }).then(onSucessfulCropImage, onFailCropImage)}
            >
                <Text>Tirar foto</Text>
            </TouchableOpacity>

            {
                errorText !== ""
                    ? (
                        <Text>{errorText}</Text>
                    )
                    : undefined
            }

        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: 200,
        width: 200,
        alignSelf: 'center',
        backgroundColor: 'pink',
    },

    cropImageButton: {
        height: 75,
        backgroundColor: 'lightblue',
    },
})

export default Main