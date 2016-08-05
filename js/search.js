var artist;
var artistId;
var albumId;
var songId;
var albumName;
var urlArtist = 'https://api.spotify.com/v1/search?type=artist&query=';
var errorArtistText = 'Artist error.';
var errorAlbumText = 'Album error.';
var errorSongText = 'Song error.';
var errorPlayText = 'Play error.';

var albumSongList;

function artistSuccess(data) {
	var artistData = data.artists.items;
	var artistResult = $('#artistBox');
	artistResult.empty();
	artistData.forEach(function(artist) {
		if(artist.images[0]!=undefined){
			artistResult.append(
				'<h3>' + artist.name + '</h3>' +
	        	'<div class="image-holder">' +
	          		'<a class="artistLink"   data-id="' + artist.id + '" href="#"><img src="' + artist.images[0].url + '" alt="' + artist.name + '" width=300 height=300></a>' +
	        	'</div>'	
			);
		}
	});
};

function albumSuccess(data) {
	var albumData = data.items;
	var albumResult = $('#albumBox');
	albumResult.empty();
	albumData.forEach(function(album) {
		albumResult.append(
			'<h3>' + album.name + '</h3>' +
        	'<div class="image-holder">' +
          		'<a class="albumLink"  data-id="' + album.id + '" href="#"><img src="' + album.images[0].url + '" alt="' + album.name + '" width=300 height=300></a>' +
        	'</div>' 
        );
	});
};

function songSuccess(data) {
	albumSongList=[];
	var songData = data.items;
	var songResult = $('#songBox');
	var i = 1;
	songResult.empty();
	songData.forEach(function(song) {
		songResult.append(
			'<div class="image-holder">' + 
				'<h3>' + 
					i + ' ' + song.name +       		
	          		'<button type="button" id = "'+i+'" class = "glyphicon glyphicon-play"'+ 	       	
	          	'</h3>' + 
	        '</div>'       		        	
        );
        albumSongList[i]=song.id;
        i++;
	});
};

function playSuccess(data) {
	$('#myModal').modal('show');

	$('.modal-body').html(
		'<div class="image-holder">' + 
			'<h3>' + 
				data.name +       		
		        '<audio class="js-player" src=' + data.preview_url + '></audio>'	+       	
		    '</h3>' + 
		'</div>'
	);

};

function play(){
	$('.js-player').trigger('play');
}

function pause(){
	$('.js-player').trigger('pause');
}

function errorArtist() {
	console.log(errorArtistText);
};

function errorAlbum() {
	console.log(errorAlbumText);
};

function errorSong() {
	console.log(errorSongText);
};

function errorPlay() {
	console.log(errorPlayText);
};

function ajaxRequest(url, f1, f2) {
	$.ajax({
		url: url,
		crossDomain: true,
		dataType: 'json',
		success: function (response){
			f1(response);
		},
		error: function (){
			f2();
		}
	});
};

function searchArtist (event) {
	event.preventDefault();
	artist = $('.artist').val();
	urlArtist = urlArtist + artist;

	ajaxRequest(urlArtist, artistSuccess, errorArtist);
};

function searchAlbum() {
	var urlAlbum = 'https://api.spotify.com/v1/artists/';
	artistId = $(this).data('id');
	urlAlbum = urlAlbum + artistId + '/albums';

	ajaxRequest(urlAlbum, albumSuccess, errorAlbum);
};

function searchSong() {
	var urlSong = 'https://api.spotify.com/v1/albums/';
	albumId = $(this).data('id');
	urlSong = urlSong + albumId + '/tracks';

	ajaxRequest(urlSong, songSuccess, errorSong);
};

function playSong() {
	var urlPlay = 'https://api.spotify.com/v1/tracks/';
	var idButton = $(this).attr('id');
	songId = albumSongList[idButton];
	urlPlay = urlPlay + songId;

	ajaxRequest(urlPlay, playSuccess, errorPlay);
};

$(document).on('click', '#searchButton', searchArtist);
$(document).on('click', '.artistLink', searchAlbum);
$(document).on('click', '.albumLink', searchSong);
$(document).on('click', '.glyphicon', playSong);
$(document).on('click', '.btn-play', play);
$(document).on('click', '.btn-close', pause);