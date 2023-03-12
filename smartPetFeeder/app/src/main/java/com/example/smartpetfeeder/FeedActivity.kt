package com.example.smartpetfeeder

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.database.FirebaseDatabase

class FeedActivity: AppCompatActivity(){
    lateinit var editTextName:EditText
    lateinit var editTextName2:EditText
    lateinit var btnUpload:Button
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.feedtime_activity)

        editTextName=findViewById(R.id.feed_time1)
        editTextName2=findViewById(R.id.feed_time2)
        btnUpload=findViewById(R.id.btn_upload)

        btnUpload.setOnClickListener{
            saveTime()
        }

    }
    private fun saveTime(){
        val time1=editTextName.text.toString().trim()
        val time2=editTextName2.text.toString().trim()

        if(time1.isEmpty()){
            editTextName.error="Please Enter The Time"
            editTextName2.error="Please Enter The Time"
            return
        }
        val ref=FirebaseDatabase.getInstance().getReference("Times")
        //val timeID=ref.push().key
        val timeID="Time"

        val feed=db(timeID,time1,time2)
        ref.child(timeID).setValue(feed).addOnCompleteListener {
            Toast.makeText(applicationContext,"Time is saved",Toast.LENGTH_SHORT).show()
        }
    }

}