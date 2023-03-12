package com.example.smartpetfeeder

import android.Manifest
import android.app.Activity
import android.bluetooth.BluetoothAdapter
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.activity.result.ActivityResult
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat


class MainActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        //initialize bluetooth adapter

        // Turn on Bluetooth
        val bluetoothOn = findViewById(R.id.btn_bluetooth) as Button
        bluetoothOn.setOnClickListener {
            startActivity(Intent(this,ServoActivity::class.java))
        }

        // set FeedActivity
        val settime = findViewById(R.id.btn_settime) as Button
        settime.setOnClickListener {
            startActivity(Intent(this,FeedActivity::class.java))
        }
    }



}