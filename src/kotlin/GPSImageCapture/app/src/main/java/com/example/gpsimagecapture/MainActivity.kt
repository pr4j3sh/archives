package com.example.gpsimagecapture

import android.Manifest
import android.content.pm.PackageManager
import android.graphics.*
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.unit.dp
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import com.example.gpsimagecapture.ui.theme.GPSImageCaptureTheme
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import java.io.File
import java.text.SimpleDateFormat
import java.util.*

class MainActivity : ComponentActivity() {

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private var imageUri: Uri? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        // Launcher to capture image
        val takePictureLauncher = registerForActivityResult(ActivityResultContracts.TakePicture()) { success ->
            if (success) {
                imageUri?.let { uri ->
                    checkLocationPermissionAndAddCoordinates(uri) { bitmap ->
                        setContent {
                            DisplayImage(bitmap)
                        }
                    }
                } ?: run {
                    Log.e("MainActivity", "Image URI is null")
                }
            } else {
                Log.e("MainActivity", "Failed to capture image")
            }
        }

        // Launcher to request permissions
        val requestPermissionLauncher = registerForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { permissions ->
            val cameraGranted = permissions[Manifest.permission.CAMERA] ?: false
            val locationGranted = permissions[Manifest.permission.ACCESS_FINE_LOCATION] ?: false

            if (cameraGranted && locationGranted) {
                captureImage { uri ->
                    takePictureLauncher.launch(uri)
                }
            } else {
                Toast.makeText(this, "Permissions denied", Toast.LENGTH_SHORT).show()
            }
        }

        setContent {
            GPSImageCaptureTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(16.dp),
                        verticalArrangement = Arrangement.Center,
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Button(onClick = {
                            requestPermissionLauncher.launch(
                                arrayOf(
                                    Manifest.permission.CAMERA,
                                    Manifest.permission.ACCESS_FINE_LOCATION
                                )
                            )
                        }) {
                            Text("Capture Image with GPS")
                        }
                    }
                }
            }
        }
    }

    private fun captureImage(onImageUriReady: (Uri) -> Unit) {
        try {
            val imageFile = createImageFile()
            imageUri = FileProvider.getUriForFile(this, "${packageName}.provider", imageFile)
            imageUri?.let { onImageUriReady(it) }
        } catch (e: Exception) {
            Log.e("MainActivity", "Error creating image file", e)
            Toast.makeText(this, "Error capturing image", Toast.LENGTH_SHORT).show()
        }
    }

    private fun createImageFile(): File {
        val timestamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.US).format(Date())
        val storageDir = getExternalFilesDir(null)
        return File.createTempFile("IMG_${timestamp}_", ".jpg", storageDir)
    }

    private fun checkLocationPermissionAndAddCoordinates(uri: Uri, onLocationAdded: (Bitmap) -> Unit) {
        if (ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED &&
            ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_COARSE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            Toast.makeText(this, "Location permission not granted", Toast.LENGTH_SHORT).show()
            return
        }

        addLocationToImage(uri, onLocationAdded)
    }

    private fun addLocationToImage(uri: Uri, onLocationAdded: (Bitmap) -> Unit) {
        // Check if location permissions are granted
        if (ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED &&
            ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_COARSE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            // Notify user that location permissions are required
            Toast.makeText(this, "Location permission not granted", Toast.LENGTH_SHORT).show()
            return
        }

        // Get the last known location
        fusedLocationClient.lastLocation.addOnSuccessListener { location ->
            location?.let {
                try {
                    // Decode the image from URI and make it mutable
                    val bitmap = BitmapFactory.decodeStream(contentResolver.openInputStream(uri))?.copy(Bitmap.Config.ARGB_8888, true)
                    bitmap?.let {
                        val canvas = Canvas(it)
                        val paint = Paint().apply {
                            color = Color.WHITE
                            textSize = 50f
                            setShadowLayer(5f, 10f, 10f, Color.BLACK)
                        }
                        // Draw location coordinates on the image
                        canvas.drawText("Lat: ${location.latitude}, Lon: ${location.longitude}", 50f, 50f, paint)

                        // Save the modified image
                        saveImage(it, uri)
                        onLocationAdded(it)
                    } ?: run {
                        Log.e("MainActivity", "Failed to decode image")
                        Toast.makeText(this, "Failed to decode image", Toast.LENGTH_SHORT).show()
                    }
                } catch (e: Exception) {
                    Log.e("MainActivity", "Error adding location to image", e)
                    Toast.makeText(this, "Error processing image", Toast.LENGTH_SHORT).show()
                }
            } ?: run {
                Log.e("MainActivity", "Location is null")
                Toast.makeText(this, "Could not get location", Toast.LENGTH_SHORT).show()
            }
        }.addOnFailureListener { e ->
            Log.e("MainActivity", "Failed to get location", e)
            Toast.makeText(this, "Failed to get location", Toast.LENGTH_SHORT).show()
        }
    }

    private fun saveImage(bitmap: Bitmap, uri: Uri) {
        try {
            contentResolver.openOutputStream(uri).use { outStream ->
                if (outStream != null) {
                    bitmap.compress(Bitmap.CompressFormat.JPEG, 100, outStream)
                }
            }
        } catch (e: Exception) {
            Log.e("MainActivity", "Error saving image", e)
            Toast.makeText(this, "Error saving image", Toast.LENGTH_SHORT).show()
        }
    }

    @Composable
    fun DisplayImage(bitmap: Bitmap) {
        Image(
            bitmap = bitmap.asImageBitmap(),
            contentDescription = null,
            modifier = Modifier.size(300.dp)
        )
    }
}
