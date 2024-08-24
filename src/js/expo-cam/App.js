import { CameraView, useCameraPermissions } from "expo-camera";
import { createRef, useRef, useState, useEffect } from "react";
import { Button, Image, StyleSheet, Text, Pressable, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import * as Location from "expo-location";

export default function App() {
  const [facing, setFacing] = useState("back");
  const [cameraReady, setCameraReady] = useState(false);
  const [currentPicture, setCurrentPicture] = useState("");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const camera = createRef();
  const imageRef = useRef();
  const [storagePermission, requestStoragePermission] =
    MediaLibrary.usePermissions();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (storagePermission === null) {
    requestStoragePermission();
  }

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestCameraPermission} title="grant permission" />
      </View>
    );
  }

  if (errorMsg) {
    alert(errorMsg);
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function onCameraReady() {
    setCameraReady(true);
  }

  async function handleCapture() {
    if (cameraReady && camera) {
      const res = await camera.current.takePictureAsync();
      setCurrentPicture(res);
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

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      alert(e);
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
              <FontAwesome6 name="camera-rotate" size={24} color="#fff" />
            </Pressable>
            <Pressable style={styles.button} onPress={handleCapture}>
              <FontAwesome6 name="camera" size={24} color="#fff" />
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
              <FontAwesome6 name="trash-can" size={24} color="black" />
            </Pressable>
            <Pressable style={styles.button} onPress={handleSave}>
              <FontAwesome6 name="save" size={24} color="black" />
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
