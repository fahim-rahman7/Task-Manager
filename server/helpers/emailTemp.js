const emailTemp = ({otp}) => {
    return `



  <div style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">


<table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f4; padding:20px 0;">
  <tr>
    <td align="center">
      
      <table width="500" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
        
        <!-- Header -->
        <tr>
          <td style="background:#4CAF50; color:#ffffff; text-align:center; padding:20px; font-size:22px; font-weight:bold;">
            Verify Your Email
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px; color:#333333;">
            
            <p style="font-size:16px; margin:0 0 15px;">
              Hello,
            </p>

            <p style="font-size:16px; margin:0 0 20px;">
              Use the OTP below to complete your verification. This code is valid for a limited time.
            </p>

            <!-- OTP Box -->
            <div style="text-align:center; margin:25px 0;">
              <span style="display:inline-block; background:#f0f0f0; padding:15px 30px; font-size:28px; letter-spacing:5px; font-weight:bold; color:#4CAF50; border-radius:8px;">
                ${otp}
              </span>
            </div>

            <p style="font-size:14px; color:#777777; margin:20px 0;">
              If you did not request this, please ignore this email.
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9; text-align:center; padding:15px; font-size:12px; color:#999999;">
            © 2026 Your Company. All rights reserved.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>


  </div>


    `
}

module.exports = {emailTemp}