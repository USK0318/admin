
function validatrPhone(phone) {
        if (phone.length !== 10) {
            return "phone number should be 10 digits";
        }
        if (isNaN(phone)) {
            return "phone number should be numeric";
        }
        if (phone[0] !== "9" && phone[0] !== "8" && phone[0] !== "7" && phone[0] !== "6") {
            return "phone number should start with 9,8,7,6";
        }
        return null;
    }

function validatrEmail(email) {
        if (!email.includes("@") || !email.includes(".")) {
            return "invalid email";
        }
        if (email.length < 5) {
            return "email should be atleast 5 characters";
        }
        if (email.length > 50) {
            return "email should be atmost 50 characters";
        }
        if (email.includes(" ")) {
            return "email should not contain spaces";
        }
    
        return null;
    }


module.exports = {
    validatrPhone,
    validatrEmail
}

