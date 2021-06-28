let myDatabase;
document.addEventListener('DOMContentLoaded', function() {
  const loadEl = document.querySelector('#load');
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  //
  // firebase.auth().onAuthStateChanged(user => { });
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.firestore().doc('/foo/bar').get().then(() => { });
  // firebase.functions().httpsCallable('yourFunction')().then(() => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
  // firebase.analytics(); // call to activate
  // firebase.analytics().logEvent('tutorial_completed');
  // firebase.performance(); // call to activate
  //
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

  try {
    let app = firebase.app();
    let features = [
      'auth', 
      'database', 
      'firestore',
      'functions',
      'messaging', 
      'storage', 
      'analytics', 
      'remoteConfig',
      'performance',
    ].filter(feature => typeof app[feature] === 'function');
    loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
  } catch (e) {
    console.error(e);
    loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
  }
  myDatabase = firebase.database();
  var helpful = 0;
  var decisionChange = 0;
  var values = load(helpful, decisionChange);
  console.log("helpful",values[0]);
  console.log("decisionChange", values[1]);
});

//refresh the data maybe like every 10 minutes?
document.addEventListener('DOMContentLoaded', function() {
  var helpful = 0;
  var decisionChange = 0;
  setInterval(function(){
    var values = load(helpful, decisionChange);
    helpful = values[0];
    decisionChange = values[1];
    console.log("helpful",values[0]);
    console.log("decisionChange", values[1]);
  },10000); //600000 //10 minutes
});
//I know, I know, bad programming practice
//but I really don't want to implement the better way right now
function load(helpful,decisionChange){
  var returnValues = [0,0];
  var temp1 = false;
  var temp2 = false;
  var query = myDatabase.ref("android").orderByKey();
  returnValues = query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
      temp1 = childSnapshot.child("helpful").val();
      temp2 = childSnapshot.child("decisionChange").val();
      helpful += (temp1 ? 1 : 0);
      decisionChange += (temp2 ? 1 : 0);
    });
    return [helpful, decisionChange];
  });
  console.log("HELPFUL",helpful);
  return returnValues;
}

