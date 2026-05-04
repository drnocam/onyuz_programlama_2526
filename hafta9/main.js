function otoAc(){
        let kutu = document.getElementById("kutu");
        if (kutu.style.height === "20px") {
            kutu.style.height = "auto";
        } else {
            kutu.style.height = "20px";
        }
    }
    function enboy(){
        let width = window.innerWidth;
        let height = window.innerHeight;
        alert("Sayfa eni: " + width + "px, Sayfa boyu: " + height + "px");
    }
    function changeColor(){
        let yazi = document.getElementById("yazi");
        yazi.style.color = "red";
    }
    function yazdir() {
        let isim_input_form = document.getElementById("name") 
        let yazi = document.getElementById("yazi")
        yazi.innerHTML =  isim_input_form.value ;
    }
    function greet() { 
        let isim_input_form = document.getElementById("name") 
        // alert("Merhaba, " + isim_input_form.value + "!");
        let yazi = document.getElementById("yazi")
        yazi.innerHTML =  isim_input_form.value ;

    }
    function RootAdd(){
        let root = document.getElementById("root");
        root.innerHTML = "<table border='1'><tr><th>Ad</th>\
                <th>Soyad</th>\
                <th>Yaş</th>\
            </tr>\
            <tr>\
                <td>Ahmet</td>\
                <td>Yılmaz</td>\
                <td>30</td>\
            </tr>\
            <tr>\
                <td>Ayşe</td>\
                <td>Kara</td>\
                <td>25</td>\
            </tr>\
        </table>\
        ";
    }

    function RootSil(){
        let root = document.getElementById("root");
        root.innerHTML = "";
    }