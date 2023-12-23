<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $cpassword = $_POST['cpassword'];

    if (!empty($firstname) || !empty($lastname) || !empty($phone) || !empty($email) || !empty($password) || !empty($cpassword)) {
        // Add your database connection code here

        $host = "localhost";
        $dbusername = "root";
        $dbpassword = "";
        $dbname = "fusion_db";

        // Database connection
        $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

        if (mysqli_connect_error()) {
            die('Connect error: ' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
        } else {
            $SELECT = "SELECT email FROM signup_table WHERE email = ? LIMIT 1";
            $INSERT = "INSERT INTO signup_table (firstname, lastname, phone, email, password, cpassword) VALUES (?, ?, ?, ?, ?, ?)";

            // Prepare statement
            $stmt = $conn->prepare($SELECT);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->bind_result($email);
            $stmt->store_result();
            $rnum = $stmt->num_rows;

            if ($rnum == 0) {
                $stmt->close();
                $stmt = $conn->prepare($INSERT);
                $stmt->bind_param("ssisss", $firstname, $lastname, $phone, $email, $password, $cpassword);
                $stmt->execute();

                echo "<script>alert('You have registered successfully.'); window.location.href='../html/Home.html';</script>";
            } else {
                echo "<script>alert('Someone has already registered using this email!'); window.location.href='../../index.html';</script>";
            }
            $stmt->close();
            $conn->close();
        }
    } else {
        echo "All fields are required";
        die();
    }
}
?>