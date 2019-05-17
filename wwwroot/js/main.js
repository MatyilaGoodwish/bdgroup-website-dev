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
     * cart datasource
     */
    const cart = new kendo.data.DataSource({
        data: []
    });

    const myOrders = new kendo.data.DataSource({
        data: []
    })

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

    const recent = $('#recent').kendoGrid({
        dataSource: myOrders,
        sortable: true,
        selectable: true       
    });
    
     /**
     * user context
     */
    const currentUser = firebase.auth().onAuthStateChanged(function(user){
        if(user){
            profile.set('email', user.email);

            firebase.firestore().collection('transactional_order').doc(user.uid).get()
            .then(function(snapShot){
               // console.log(snapShot.data());

                myOrders.add(snapShot.data());

                myOrders.sync();

            //console.log(myOrders.data());
            }).catch(function(error){
                console.log(error);
            });
            
            return user.uid;
        }else{
            location.replace('/');
        }
    });
    

    /**
     * user profile
     */
    const profile = kendo.observable({

        soon: function(){
            kendo.confirm('Coming soon later this year');
        },
        logout: function(){

            firebase.auth().signOut();

        },

        clearCart: function(){

            $("#shopping-bag").data("kendoGrid").dataSource.data([]);

            cart.data([]);

            console.log(cart.data());
        },

        checkOut: function(e){
             firebase.auth().onAuthStateChanged(function(user){
                /**
                 * use validated user
                 */
                if(user){
                    for(let i = 0; i < cart.data().length; i++)
                    {
                        firebase.firestore().collection('transactional_order').doc(user.uid).set(
                            JSON.parse(JSON.stringify(cart.data()[i]))
                        ).catch(function(error){
                            kendo.alert('Poor network connection');
                        });




                        firebase.firestore().collection('transactional_order').doc(user.uid).get()
                        .then(function(snapShot){
                            //console.log(snapShot.data());

                            myOrders.add(snapShot.data());

                            myOrders.sync();

                            location.replace('account.html');

                        //console.log(myOrders.data());
                        }).catch(function(error){
                            console.log(error);
                        });
  
                    }
                    //kendo.confirm('Your order has been processed');
                }
             })
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
                Deposit: '20%'
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
