var config = {
    apiKey: "AIzaSyAJgTqulenhqg-w2NpnevLo4g1qg97qozg",
    authDomain: "origano-1a760.firebaseapp.com",
    databaseURL: "https://origano-1a760.firebaseio.com",
    projectId: "origano-1a760",
    storageBucket: "origano-1a760.appspot.com",
    messagingSenderId: "150780361565"
  };
  firebase.initializeApp(config);


  function renderTable() { 
    var order= firebase.database().ref("order/" );
    order.on("child_added", function (data) {
        var orderValue = data.val();
        document.getElementById("table").innerHTML += `
            <tr>
            <td>${orderValue.id} </td>
            <td>${orderValue.order} </td>
            <td>${orderValue.total} </td>
        `; 
    });
};

