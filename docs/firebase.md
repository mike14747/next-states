Add this code to the bottom of the <body> tags, but before you use any Firebase services.

Note: a tutorial said to place it inside the <head> tags.

```html
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<!-- maybe this auth cdn will be used -->
<script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-auth.js"></script>

<!-- this is the cdn for the firestore database -->
<script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-firestore.js"></script>

<script>
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: 'AIzaSyDFQ-rXXTwGNL1jCNH0JLja_rn0G302Tx0',
        authDomain: 'next-states.firebaseapp.com',
        projectId: 'next-states',
        storageBucket: 'next-states.appspot.com',
        messagingSenderId: '595851596128',
        appId: '1:595851596128:web:dfe619993f30c43e560e05',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
</script>
```

---

To use firebase in a React app, install these 2 npm packages:

```bash
npm i firebase react-firebase-hooks
```

In App.js (or maybe in \_app.js in next.js), import the following:

```js
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; // if you're using auth
import { useAuthState } from 'react-firebase-hooks/auth'; // if you're using auth
import { useCollectionData } from 'react-firebase-hooks/firestore';

var firebaseConfig = {
    apiKey: 'AIzaSyDFQ-rXXTwGNL1jCNH0JLja_rn0G302Tx0',
    authDomain: 'next-states.firebaseapp.com',
    projectId: 'next-states',
    storageBucket: 'next-states.appspot.com',
    messagingSenderId: '595851596128',
    appId: '1:595851596128:web:dfe619993f30c43e560e05',
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(); // if you're using auth
const firestore = firebase.firestore();

const [user] = useAuthState(auth);

// inside the component
return (
    <div>
        {user ? <SomeComponent /> : <Login />}
    </div>
);
```
