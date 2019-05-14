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
        if(user){
            console.log('passed');
            profile.set('email', user.email);
            return user.uid;
        }else{
            console.log('failed');
        }
    });
    
    /**
     * cart datasource
     */
    const cart = new kendo.data.DataSource({
        data: []
    });


     /**
     * bind data source with grid  for cart
     */
    const shopping = $('#shopping-bag').kendoGrid({
        dataSource: cart,
         
        sortable: true,
        selectable: true,
        schema: {
            model:  {
                id: 'id'
            },
        }
       
    });
    
    

    /**
     * user profile
     */
    const profile = kendo.observable({
        checkOut: function(e){
            firebase.firestore().collection('Transactions').doc(`${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDay()}_Order`).set({
                sample: ""
            })
            .catch(error=>{
                console.log(error.message);
            })
            console.log(cart.data());
        },
        email: "",
        
        orderWebsite: function(){
            /**
             * Hide orders view
             */
            $('#orders').modal('hide');
    
            /**
             * Add product to cart
             */
            cart.add({
                id: Number(Math.random() * 10000).toFixed(0),
                Price: 'R2000',
                Product: 'Website for Small business',
                Support: '1 year',
                Deposit: '20%'
            })
            
            /**
             * sync data source
             */
            cart.sync();


             
    
            /**
             * display shopping cart
             */
            $('#cart').modal('show');
        },
        orderWithCloud: function(){
    
            /**
             * hide orders
             */
            $('#orders').modal('hide');
    
            /**
             * add to data source
             */
            cart.add({
                id: Number(Math.random() * 10000).toFixed(0),
                Price: 'R4000',
                Product: 'Website for Small business',
                Support: '1 year',
                Deposit: '20%',
                command: "destroy"
            });
            
            /**
             * update data source
             */
            cart.sync();

             
            /**
             * display cart
             */
            $('#cart').modal('show');
        },
        orderWithApp: function(){
    
            /**
             * hide orders
             */
            $('#orders').modal('hide');
    
            /**
             * add to data source
             */
            cart.add({
                id: Number(Math.random() * 10000).toFixed(0),
                Price: 'R9000',
                Product: 'Website for Small business',
                Support: '1 year',
                Deposit: '70%'
            })
            
            /**
             * update data source
             */
            cart.sync();
 
            /**
             * show shopping cart
             */
            $('#cart').modal('show');
        }
    });
    
    
    /**
     * bind kendo ui with observable
     */
    
    kendo.bind(document.body, profile);
     
     
    
    
     


})
