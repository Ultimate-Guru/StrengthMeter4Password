const password = document.querySelector('#YourPassword');
const togglePassword = document.querySelector('#togglePassword');
const strengthMeter = document.querySelector('.strengthMeter');
const container = document.querySelector('.container');

// Show/Hide Password Toggle
togglePassword.addEventListener('click', () => {
    if (password.type === 'password') {
        password.type = 'text';
        togglePassword.textContent = 'HIDE';
    } else {
        password.type = 'password';
        togglePassword.textContent = 'SHOW';
    }
});

// Password Strength Logic
password.addEventListener('input', () => {
    const strength = checkStrength(password.value);
    updateStrengthMeter(strength);
});

// Function to check password strength
function checkStrength(password) {
    let strength = 0;

    // Check for various conditions
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
}

// Function to update the strength meter based on the strength value  
function updateStrengthMeter(strength) {
    // Reset classes and width  
    strengthMeter.classList.remove('weak', 'moderate', 'strong');
    strengthMeter.style.width = '0%'; // Reset the width to clear visual feedback  

    // Update class and width based on the strength value  
    if (strength <= 2) {
        strengthMeter.classList.add('weak');
        strengthMeter.style.width = '20%';
        strengthMeter.style.filter = 'drop-shadow(0 0 5px #f00) drop-shadow(0 0 10px #f00) drop-shadow(0 0 20px #f00)';
    } else if (strength >= 3 && strength <= 4) {
        strengthMeter.classList.add('moderate');
        strengthMeter.style.width = '70%';
        strengthMeter.style.filter = 'drop-shadow(0 0 5px #eedc3d) drop-shadow(0 0 10px #eedc3d) drop-shadow(0 0 20px #eedc3d)';
    } else if (strength === 5) {
        strengthMeter.classList.add('strong');
        strengthMeter.style.width = '100%';
        strengthMeter.style.filter = 'drop-shadow(0 0 5px #00f500) drop-shadow(0 0 10px #00f500) drop-shadow(0 0 20px #00f500)';
    }
}

// Call the update function initially to set the meter with default value  
updateStrengthMeter(checkStrength(password.value));