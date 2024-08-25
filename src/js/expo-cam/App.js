import { CameraView, useCameraPermissions } from "expo-camera";
import { createRef, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
  ToastAndroid,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { usePermissions, saveToLibraryAsync } from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";

export default function App() {
  const [facing, setFacing] = useState("back");
  const [cameraReady, setCameraReady] = useState(false);
  const [currentPicture, setCurrentPicture] = useState("");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [storagePermission, requestStoragePermission] = usePermissions();
  const [locationPermission, requestLocationPermission] =
    useForegroundPermissions();
  const camera = createRef();
  const imageRef = useRef();
  const [location, setLocation] = useState(null);

  if (!cameraPermission) {
    requestCameraPermission();
  }

  if (!storagePermission) {
    requestStoragePermission();
  }

  if (!locationPermission) {
    requestLocationPermission();
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function onCameraReady() {
    setCameraReady(true);
  }

  async function handleCapture() {
    try {
      if (cameraReady && camera) {
        const res = await camera.current.takePictureAsync();
        setCurrentPicture(res);
        const location = await getCurrentPositionAsync();
        setLocation(location);
      }
    } catch (error) {
      alert("Error", error);
    }
  }

  function handleDelete() {
    setCurrentPicture("");
  }

  async function handleSave() {
    try {
      const localUri = await captureRef(imageRef, {
        height: 640,
        quality: 1,
      });

      await saveToLibraryAsync(localUri);
      if (localUri) {
        ToastAndroid.show("Saved to gallery", ToastAndroid.SHORT);
      }
    } catch (error) {
      alert("Error", error);
    }
  }

  return (
    <View style={styles.container}>
      {currentPicture.length === 0 ? (
        <CameraView
          ref={camera}
          style={styles.camera}
          pictureSize="480x640"
          facing={facing}
          onCameraReady={onCameraReady}
        >
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={toggleCameraFacing}>
              <FontAwesome6 name="camera-rotate" size={24} color="#000" />
            </Pressable>
            <Pressable style={styles.button} onPress={handleCapture}>
              <FontAwesome6 name="camera" size={24} color="#000" />
            </Pressable>
          </View>
        </CameraView>
      ) : (
        <>
          <View ref={imageRef} collapsable={false}>
            <Image style={styles.image} source={{ uri: currentPicture.uri }} />
            <View style={styles.caption}>
              <FontAwesome6 name="location-crosshairs" size={24} color="#fff" />
              <Text style={styles.text}>
                {`${location?.coords.latitude}, ${location?.coords.longitude}`}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleDelete}>
              <FontAwesome6 name="trash" size={24} color="black" />
            </Pressable>
            <Pressable style={styles.button} onPress={handleSave}>
              <FontAwesome6 name="download" size={24} color="black" />
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "transparent",
    marginVertical: 20,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 16,
    borderRadius: 50,
    backgroundColor: "#efefef",
  },
  caption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    margin: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  image: {
    aspectRatio: 3 / 4,
    width: "100%",
  },
});
