<?php
   $host = "localhost";
   $dbusername = "root";
   $dbpassword = "";
   $dbname = "fusion_db";

   //Database connection

   $conn = new mysqli($host,$dbusername,$dbpassword,$dbname);


      $email = $_POST['email'];
      $password=$_POST['password'];
     
      $result=mysqli_query($conn,"SELECT * FROM signup_table WHERE email= '$email' and password= '$password'");
      $test=mysqli_fetch_array($result);
      $rows=mysqli_num_rows( $result);
      if($rows>0){

         echo "<script>window.location.href='../html/Home.html';</script>";
         
         
      } 
      else{
        
         echo "<script>alert('You have entered an invalid username or password.');
         window.location.href='../../index.html';</script>"; 
        }
?> 