import { Fragment } from 'react';

const Faq = () => {
    return(
        <Fragment>
<div class="container">
<form action = "/"><button className='btn btn-danger btn-block mt-4'> Go Back</button></form>
  <h2>Frequently Asked Questions</h2>
  <br></br>

  <div class="accordion">
    <div class="accordion-item">
      <h2><i>Who can register?</i></h2>
      <div class="content">
        <p>Only Admin is able to register whereas teachers and students are added by the Admin. Teachers and Students can directly login via Login page.</p>
      </div>
    </div>
    <div class="accordion-item">
      <h2><i>How to login?</i></h2>
      <div class="content">
        <p>You can login by entering your email address and password provided by college administration. Contact college administration if you don't have the credentials.</p>
      </div>
    </div>
    <div class="accordion-item">
      <h2><i>Can I see my attendance record?</i></h2>
      <div class="content">
        <p>Yes, once you login as a student you would be able to see  your attendance report.</p>
      </div>
    </div>
    <div class="accordion-item">
      <h2><i>Where can I see my timetable for the week?</i></h2>
      <div class="content">
        <p>You need to login as a student then you can see your timetable for the week in show timetable option.</p>
      </div>
    </div>
    <div class="accordion-item">
      <h2><i>How do I ensure my attendance is marked for a session?</i></h2>
      <div class="content">
        <p>For this you need to ensure that the bluetooth of the device registered with college is kept "ON" while attending the session.</p>
      </div>
    </div>
    <div class="accordion-item">
      <h2><i>Not able to login ?</i></h2>
      <div class="content">
        <p>Check your credentials, If still the problem exists contact college administration.</p>
      </div>
    </div>
    <div class="accordion-item">
      <h2><i>Is my data safe while using this online system?</i></h2>
      <div class="content">
        <p>Yes, the college administration assures you that the data about your device, personal info is safe with us. Also it will not be used for any other purpose other than this.</p>
      </div>
    </div>
    <div class="accordion-item">
      <h2><i>How do teachers record the attendance?</i></h2>
      <div class="content">
        <p>Once logged in as teacher you just need to upload a csv file that you get from the supplementary bluetooth app.</p>
      </div>
    </div>
    <div class="accordion-item">
      <h2><i>About supplemenatry bluetooth App</i></h2>
      <div class="content">
        <p>Details about this app will be shared by the college administration. Teachers can contact the college administration.</p>
      </div>
    </div>
  </div>
  
</div>
</Fragment>
    )
}

export default Faq;