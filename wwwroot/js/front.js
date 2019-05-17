//define firebase
/**
 * Firebase Auth Project Configurations
 * Google GCP
 * @firestore
 * @storage
 * @database
 * @ApiKey
 * @messagingSenderID
 */
var config = {
    apiKey: "AIzaSyBtmbzlzote3niZyXcx9HYx-GIWdv5zx4k",
    authDomain: "bd-group-3763.firebaseapp.com",
    databaseURL: "https://bd-group-3763.firebaseio.com",
    projectId: "bd-group-3763",
    storageBucket: "bd-group-3763.appspot.com",
    messagingSenderId: "52918020059"
  };
firebase.initializeApp(config);
 

$(document).ready(function(){
    /**
     * user context
     */
    const currentUser = firebase.auth().onAuthStateChanged(function(user){
        if(!user){
            
        }else{
            location.replace('/account.html');
        }
    });
    
    /**
     * model
     */
    const ui = kendo.observable({
        loginID: "demo@bdsoft.co.za",
        regID:"demo@bdsoft.co.za",
        regPass:"",
        loginPass:"",
        regSession: async function(){
            /**
             * attemp registration
             */
            try{
                let reg = await firebase.auth().createUserWithEmailAndPassword(ui.get('regID'), ui.get('regPass'));
            }catch(error){
               kendo.confirm(error.message)
            }
            
        },
        loginSession: async  function(){
           /**
            * attempt attempt login
            */
            try{
                let logi =  await firebase.auth().signInWithEmailAndPassword(ui.get('loginID'), ui.get('loginPass'));
            }catch(error){
                kendo.confirm(error.message); 
            }
        }
    });

    kendo.bind(document.body,ui);


})