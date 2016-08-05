var url = 'jsonp/usersJSONP.jsonp';
var name = "";
var password = "";

var errorMessage = 'Data error.';


function check() {
	console.log('Checking your data...')
};

function success(data) {
	var correct = false;
	var myUser;
	var i = 0;

	while(i < data.users.length && !correct) {
		if(data.users[i].name == name && data.users[i].password == password) {
			correct = true;
		}
		i++;
	}

	if(correct) {
		console.log('User and password correct');
		window.location.href = 'search.html';
		myUser = {
			name: name,
			password: password
		};
		window.sessionStorage.setItem('userSession', JSON.stringify(myUser));
	} else {
		console.log('User or password incorrect');
	}
};

function error(e) {
	console.log(e);
};

function ajaxRequest(url, f1, f2, f3) {
	$.ajax({
		type: 'GET',
		url: url,
		crossDomain: true,
		jsonpCallback: 'usersJSONP',
		contentType: 'application/jsonp',
		dataType: 'jsonp',
		check: f1(),
		success: function (response){
			f2(response);
		},
		error: function (){
			f3();
		}
	});
};

function login () {
	name = $('.nameInput').val();
	password = $('.passInput').val();

	ajaxRequest(url, check, success, error);
};

$(document).on('click', '#loginButton', login);