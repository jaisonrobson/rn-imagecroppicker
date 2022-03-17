import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

const Main = () => {
    const [image, setImage] = useState({})
    const [errorText, setErrorText] = useState("")

    const onSuccessfulGetImage = (resultImage) => adjustActualPhoto(resultImage)

    const onFailGetImage = () => {
        setImage({})
        setErrorText("Falha ao carregar imagem.")
    }

    const onSuccessfulCropImage = (resultImage) => {
        setImage(resultImage)
        setErrorText("")
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

    const takePicture = () => {
        ImagePicker.openCamera({
            width: 600,
            height: 600,
            cropping: false,
        }).then(onSuccessfulGetImage, onFailGetImage)
    }

    const chooseFromGallery = () => {
        ImagePicker.openPicker({
            width: 600,
            height: 600,
            cropping: false,
        }).then(onSuccessfulGetImage, onFailGetImage)
    }

    const adjustActualPhoto = (imageParam) => {
        ImagePicker.openCropper({
            path: imageParam.path,
            width: 600,
            height: 600,
        }).then(onSuccessfulCropImage)
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
                onPress={chooseFromGallery}
            >
                <Text>Escolher imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cropImageButton}
                onPress={takePicture}
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