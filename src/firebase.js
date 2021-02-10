import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyA4oS5pAsD_K4nLuzwf5KQsv6g9XjVDEpY",
    authDomain: "buurtapp-366d6.firebaseapp.com",
    databaseURL: "https://buurtapp-366d6-default-rtdb.firebaseio.com",
    projectId: "buurtapp-366d6",
    storageBucket: "buurtapp-366d6.appspot.com",
    messagingSenderId: "353722061377",
    appId: "1:353722061377:web:9e34ee28968a47668e6cc0"
};
firebase.initializeApp(firebaseConfig);
export default firebase