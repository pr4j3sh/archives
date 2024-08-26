package com.example.listview

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.listview.ui.theme.ListViewTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            ListViewTheme {
                Column(
                    modifier = Modifier.fillMaxSize(),
                ) {
                    var book by remember {
                        mutableStateOf("")
                    }
                    var books by remember {
                        mutableStateOf(listOf<String>())
                    }
                    Row(
                        modifier = Modifier.padding(vertical = 20.dp)
                    ) {
                        TextField(value = book, onValueChange = { text: String ->
                            book = text
                        })
                        Button(onClick = {
                            books += book
                            book = ""
                        }) {
                            Text(text = "Add")
                        }
                    }
                    LazyColumn (modifier = Modifier.fillMaxWidth()){
                        items(books) { item ->
                            Text(
                                text = item,
                                modifier = Modifier.padding(16.dp)
                            )
                        }
                    }
                }
            }
        }
    }
}