function validateForm() {
    let name = document.getElementById("firstName").value;
    let lname = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let correct = 1;

    if (name == "" || lname == "" || email == "" || message == "") {
        alert("Please fill in all fields.");
        correct = 0;
        return false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        correct = 0;
        return false;
    }

    if (correct == 1) {
        alert("Success!");
    }
    return true;
}
