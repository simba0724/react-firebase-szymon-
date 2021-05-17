import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAHkDXtPpnmqg_DzXFsnazPEUJOt7kk-X8",
  authDomain: "task1-6b4bc.firebaseapp.com",
  databaseURL: "https://task1-6b4bc-default-rtdb.firebaseio.com",
  projectId: "task1-6b4bc",
  storageBucket: "task1-6b4bc.appspot.com",
  messagingSenderId: "610784548222",
  appId: "1:610784548222:web:60aff1442c2d00fa084f2f",
  measurementId: "G-BZHGYBNMKY"
};

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// };

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
    this.storedb = app.firestore();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = async (email, password) => {
    let authUser;
    await this.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        authUser = user;
        const displayName = user.user.email.split("@")[0];
        return this.auth.currentUser.updateProfile({ displayName });
      });

    return authUser;
  }

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = async () => {
    await this.auth.signOut();
    window.location.href = "/";
  };

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  doUpdateuser = async user => {
    if(user.email !== this.auth.currentUser.email){
      await this.auth.currentUser.updateEmail(user.email).then(async () => {
        const displayName = user.email.split("@")[0];
        await this.auth.currentUser.updateProfile({ displayName });
        await this.db.ref(`users/${user.uid}`).update({email: user.email});
      }).catch(err => {
        window.alert("Login again and then try it!");
        console.log(err)
      });
    }
    let updateuser = {
      firstname: user.firstname,
      lastname: user.lastname,
      company: user.company,
      description: user.description
    };

    await this.db.ref(`users/${user.uid}`).update(updateuser);
    window.location.href = "/profile";
  }

  doAddImage(data) {
    const uploadTask = this.storage.ref(`images/${data.image.name}`).put(data.image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      error => {
        console.log(error);
      },
      async () => {
        // complete function ...
        await this.storage
          .ref("images")
          .child(data.image.name)
          .getDownloadURL()
          .then(async url => {
            await this.db.ref(`users/${data.uid}`).update({image: url});
            await this.auth.currentUser.updateProfile({ photoURL: url });
            window.location.href="/profile";
          });
      }
    )
  }

  doChangePassword(password) {
    this.auth.currentUser.updatePassword(password).then(() => {
      this.doSignOut();
      alert("Password was changed successfull1!");
    }).catch(function(error) {
      window.alert("Login again and then try it!");
      console.log(error)
    });
  }
  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');

  friend = async uid => {
    var friend = new Promise((resolve, reject) => {
      this.storedb.collection(`friends`)
        .doc(uid)
        .get()
        .then(data => resolve(data.data()))
    })
    return friend;
  }

  deletefriend = async uid => {
    console.log(uid);
    this.storedb.collection(`friends`).doc(uid).delete().then(() => {
      console.log("Document successfully deleted!");
      window.location.href="/dashboard_people";
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  friends = () => this.storedb.collection('friends');

  addFriend = async (friend) => {
    if(friend.id){
      await this.friends().doc(friend.id).update({
        ...friend,
        me: this.auth.currentUser.uid,
        createdAt: this.serverValue.TIMESTAMP,
      });
    } else {
      await this.friends().doc().set({
        ...friend,
        me: this.auth.currentUser.uid,
        createdAt: this.serverValue.TIMESTAMP,
      });
    }
    window.location.href = "/dashboard_people";
  }
}

export default Firebase;
