const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

var date= new Date();

let hr=date.getHours();
let min=date.getMinutes();
let sec= date.getSeconds();

let hrposition = (hr*360/12)+(min*(360/60)/12);
let minposition = (min*360/60)+(sec*(360/60)/60);
let secposition = sec*360/60;

function runTheClock(){
// logic two of the program, this relies on the browser to update the timeout
// it helps sustain the finesse transition of the minute hand between 254 deg to 0
// the main drawback is the browser throttlling the js
hrposition=hrposition+(3/360);
minposition=minposition+(6/60);
secposition=secposition+(6);

  // console.log("hour: "+hr+" Minute: "+min+" Second "+sec);

  HOURHAND.style.transform = "rotate(" + hrposition + "deg)";
  MINUTEHAND.style.transform = "rotate(" + minposition + "deg)";
  SECONDHAND.style.transform = "rotate(" + secposition + "deg)";

}

var interval=setInterval(runTheClock, 1000);
// the nice animation movement of the clock is powered by the transition 5sec
//in the sstyle


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyA-bRrwKF1OgmMNOI65BXQRZaFIXfBErB0",
  authDomain: "comments1-b6684.firebaseapp.com",
  databaseURL: "https://comments1-b6684.firebaseio.com",
  projectId: "comments1-b6684",
  storageBucket: "comments1-b6684.appspot.com",
  messagingSenderId: "454463030994",
  appId: "1:454463030994:web:d7344015bce56772f58f0b",
  measurementId: "G-1H2HR280RR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

//Rootref is the whole database.
const rootRef = firebase.database().ref();
//commentsRef is just the pageCountsNode
const commentsRef = rootRef.child('comments');
//Listen for click on Submit Comment button, and post comment.
document.getElementById("btnSubmitComment").addEventListener("click", function () {
  //Replace line breaks in comment with br tags.
  var newcomment = document.getElementById('txComment').value.replace(/\n/g, "<br>");
  //Define a new, keyed post.
  var newPostRef = commentsRef.push();
  //Fill tne new keyed post with data
  newPostRef.set({
      name: document.getElementById('tbName').value.trim(),
      comment: newcomment.trim(),
      frompage: location.pathname,
      when: firebase.database.ServerValue.TIMESTAMP
  });
});

function showpastcomments() {
  var showat = document.getElementById('pastcomments');
  //Get comments whose from page equals this page's pathname.
  var commentsRef = firebase.database().ref('comments/').orderByChild('frompage').equalTo(location.pathname);
  commentsRef.once('value', function (snapshot) {
      snapshot.forEach(function (itemSnapshot) {
          //Get the object for one snapshot
          var itemData = itemSnapshot.val();
          var comment = itemData.comment;
          var name = itemData.name;
          var when = new Date(itemData.when).toLocaleDateString("en-us");
          showat.innerHTML += "<li>" + comment + "<span> -- " + name + " (" + when +
              ")</span></li>";
      })
  })
}
//Called when page first opens and also after Submit button click to show all comments for this page.
showpastcomments()
