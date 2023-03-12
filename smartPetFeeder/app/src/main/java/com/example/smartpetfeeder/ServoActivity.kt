package com.example.smartpetfeeder

import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.database.FirebaseDatabase

class ServoActivity: AppCompatActivity() {

    lateinit var btn_ON:Button
    lateinit var btn_OFF:Button
    lateinit var btn_5s: Button
    lateinit var btn_10s:Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.servo_activity)
        btn_ON=findViewById(R.id.btn_ON)
        btn_OFF=findViewById(R.id.btn_OFF)
        btn_5s=findViewById(R.id.btn_5s)
        btn_10s=findViewById(R.id.btn_10s)

        btn_ON.setOnClickListener {
            saveString("ON")
        }
        btn_OFF.setOnClickListener {
            saveString("OFF")
        }
        btn_5s.setOnClickListener {
            saveString("5s")
        }
        btn_10s.setOnClickListener {
            saveString("10s")
        }
    }
    private fun saveString(s:String){
        val ref= FirebaseDatabase.getInstance().getReference("String")
        //val timeID=ref.push().key
        val timeID="text"

        val feed=db2(timeID.toString(),s)
        ref.child(timeID).setValue(feed).addOnCompleteListener {
            if(s=="ON") Toast.makeText(applicationContext,"feeder is on", Toast.LENGTH_SHORT).show()
            else if(s=="OFF") Toast.makeText(applicationContext,"feeder is off", Toast.LENGTH_SHORT).show()
            else if(s=="5s") Toast.makeText(applicationContext,"feeder is on for 5s", Toast.LENGTH_SHORT).show()
            else if(s=="10s") Toast.makeText(applicationContext,"feeder is on for 10s", Toast.LENGTH_SHORT).show()
        }
    }
}