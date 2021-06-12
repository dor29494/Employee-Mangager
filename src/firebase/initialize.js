export function initialize(firebase) {
    // [START storage_initialize]
    // Set the configuration for your app
    // TODO: Replace with your app's config object
    var firebaseConfig = {
        apiKey: "AIzaSyDNmHlpDUoosr0NZgTOo7DBlussDF47Juc",
        authDomain: "ls-interview-1e981.firebaseapp.com",
        projectId: "ls-interview-1e981",
        storageBucket: "ls-interview-1e981.appspot.com",
        messagingSenderId: "223379082844",
        appId: "1:223379082844:web:eb4ef573ae52a2bc73a099",
        measurementId: "G-QQG2XSXCTZ"
      };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
   }else {
      firebase.app(); // if already initialized, use that one

   }
   

  
    // Get a reference to the storage service, which is used to create references in your storage bucket
    // [END storage_initialize]
  }