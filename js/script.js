window.onload=function(){

setTimeout(function(){

const loader=document.getElementById("loader");

loader.style.opacity="0";
loader.style.pointerEvents="none";

setTimeout(()=>{
loader.style.display="none";
},1000);

},1800);

}

let slides=document.querySelectorAll(".slide");
let current=0;

setInterval(function(){

slides[current].classList.remove("active");

current=(current+1)%slides.length;

slides[current].classList.add("active");

},5000);

let panel=document.getElementById("panel-list");

for(let i=1;i<=10;i++){

panel.innerHTML+=`
<div class="card" onclick="beli('Panel ${i} GB','Rp${i}.000')">
<h3>Panel ${i} GB</h3>
<p>Rp${i}.000</p>
</div>
`;

}

panel.innerHTML+=`
<div class="card" onclick="beli('Panel Unlimited','Rp16.000')">
<h3>Panel Unlimited</h3>
<p>Rp16.000</p>
</div>
`;

function showHome(){

document.getElementById("home").style.display="block";

document.getElementById("produk").style.display="none";

document.getElementById("homeBtn").classList.add("active");

document.getElementById("produkBtn").classList.remove("active");

}

function showProduk(){

document.getElementById("home").style.display="none";

document.getElementById("produk").style.display="block";

document.getElementById("produkBtn").classList.add("active");

document.getElementById("homeBtn").classList.remove("active");

}

const audio=document.getElementById("audio");

const playlist=[
"music/musik1.mp3",
"music/musik2.mp3",
"music/musik3.mp3",
"music/musik4.mp3",
"music/musik5.mp3",
"music/musik6.mp3"
];

const songNames = [
"MANGU",
"SEAMIN TAK SEIMAN",
"SEDIA AKU SEBELUM HUJAN",
"JIWA YANG BERSEDIH",
"BERTAUT",
"HALU"
];

const songCovers = [
"img/cover1.jpg",
"img/cover2.jpg",
"img/cover3.jpg",
"img/cover4.jpg",
"img/cover5.jpg",
"img/cover6.jpg"
];

let currentMusic=0;

audio.src=playlist[currentMusic];
updateSongInfo();

function toggleMenu(){

let x=document.getElementById("musicMenu");

x.style.display=x.style.display=="block"
? "none"
: "block";

}

function playMusic(){
audio.play();
}

function pauseMusic(){
audio.pause();
}

function togglePlay(){

if(audio.paused){

audio.play();

}else{

audio.pause();

}

}

function nextMusic(){

currentMusic++;

if(currentMusic>=playlist.length){
currentMusic=0;
}

audio.src=playlist[currentMusic];
updateSongInfo();
audio.play();

}

function prevMusic(){

currentMusic--;

if(currentMusic<0){
currentMusic=playlist.length-1;
}

audio.src=playlist[currentMusic];
updateSongInfo();
audio.play();

}

function changeMusic(){

currentMusic=
document.getElementById("musicSelect").selectedIndex;

audio.src=playlist[currentMusic];
updateSongInfo();
audio.play();

}

audio.addEventListener("ended",()=>{

currentMusic++;

if(currentMusic>=playlist.length){
currentMusic=0;
}

document.getElementById("musicSelect").selectedIndex=currentMusic;

audio.src=playlist[currentMusic];

audio.play();

});

const box=document.getElementById("musicPlayer");

let drag=false;
let x=0;
let y=0;

box.addEventListener("pointerdown",e=>{

drag=true;

x=e.clientX-box.offsetLeft;

y=e.clientY-box.offsetTop;

});

document.addEventListener("pointermove",e=>{

if(!drag)return;

box.style.left=(e.clientX-x)+"px";
box.style.top=(e.clientY-y)+"px";

box.style.right="auto";
box.style.transform="none";

});

document.addEventListener("pointerup",()=>{

drag=false;

});

let produk="";
let harga="";

function beli(nama,hargaBarang){

produk=nama;
harga=hargaBarang;

document.getElementById("namaProduk").innerHTML=nama;

document.getElementById("hargaProduk").innerHTML=hargaBarang;

document.getElementById("popup").style.display="flex";

}

function tutupPopup(){

document.getElementById("popup").style.display="none";

}

let namaUser="";
let nomorUser="";

function bayar(){

namaUser=
document.getElementById("namaPembeli").value;

nomorUser=
document.getElementById("waPembeli").value;

if(namaUser==""){

alert("Masukkan nama.");

return;

}

if(nomorUser==""){

alert("Masukkan nomor WhatsApp.");

return;

}

document.getElementById("popup").style.display="none";

document.getElementById("qrisNama").innerHTML=
"Produk : "+produk;

document.getElementById("qrisHarga").innerHTML=
"Harga : "+harga;

document.getElementById("qrisPopup").style.display="flex";

}

function tutupQris(){

document.getElementById("qrisPopup").style.display="none";

}

function selesaiBayar(){

document.getElementById("qrisPopup").style.display="none";

let isi =
"Nama : "+namaUser+
"<br>WA : "+nomorUser+
"<br>Produk : "+produk+
"<br>Harga : "+harga+
"<br><br>Status : <b>PENDING</b>";

if(produk.toLowerCase().includes("sewa bot")){

isi += `
<br><br>
<input type="text"
id="linkGrup"
placeholder="Masukkan Link Grup WhatsApp"
style="width:100%;height:45px;border:none;border-radius:10px;padding:10px;margin-top:10px;">
`;

}

isi += `
<br><br>
<button onclick="kirimKeWA()">
Kirim Pesanan
</button>
`;

document.getElementById("strukIsi").innerHTML = isi;
document.getElementById("strukPopup").style.display = "flex";

}

function tutupUpload(){

document.getElementById("uploadPopup").style.display="none";

}

function kirimBukti(){

let file=
document.getElementById("bukti").files[0];

if(!file){

alert("Upload bukti pembayaran.");

return;

}

alert(

"✅ Bukti pembayaran berhasil.\n\n"+

"Nama : "+namaUser+

"\nWA : "+nomorUser+

"\nProduk : "+produk+

"\nHarga : "+harga+

"\n\nAdmin akan memproses pesanan."

);

document.getElementById("uploadPopup").style.display="none";

document.getElementById("preview").style.display="none";

document.getElementById("bukti").value="";

}

function previewBukti(){

let file=
document.getElementById("bukti").files[0];

if(!file)return;

let reader=new FileReader();

reader.onload=function(e){

let img=
document.getElementById("preview");

img.src=e.target.result;

img.style.display="block";

};

reader.readAsDataURL(file);

}

function tutupStruk(){

document.getElementById("strukPopup").style.display="none";

}

function kirimKeWA(){

let pesan =
`*PESANAN BARU NEBULA PANEL*

Nama : ${namaUser}
WA : ${nomorUser}
Produk : ${produk}
Harga : ${harga}
Status : PENDING`;

if(produk.toLowerCase().includes("sewa bot")){

let link =
document.getElementById("linkGrup").value;

if(link==""){
alert("Masukkan link grup terlebih dahulu.");
return;
}

pesan += `

Link Grup :
${link}`;
}

let nomorAdmin = "6285654863254";

let url =
`https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`;

window.open(url,"_blank");

}

function updateSongInfo(){

document.getElementById("songTitle").textContent =
songNames[currentMusic];

document.getElementById("songArtist").textContent =
"Nebula Music";

document.getElementById("cover").src =
songCovers[currentMusic];

}